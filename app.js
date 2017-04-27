/**
 * Created by poste on 08/04/2017.
 */
'use strict';

const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('cookie-session');
const uuid = require('node-uuid');
const request = require('request');
const JSONbig = require('json-bigint');
const async = require('async');
var fs = require('fs');
var url = require('url');
var progress = require('progress-stream');
const REST_PORT = (process.env.PORT || 5000);
const app = express();
var db=require('./models/db');
app.use(express.static(__dirname+'/client'));
//app.use(bodyParser.text({type: 'application/json'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
multer();
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
var facebookBot= require('./server/bot');
var api = require('./server/api');
var apiUniversity = require('./server/apiUniversity');
var apidiploma = require('./server/apidiploma');
var Section = require('./server/Section');
var apiuser =require('./server/user.service.server');
var apimap = require('./models/app/routes');

var apisub = require('./server/apisub');
app.use('/app',apimap);
app.use('/apisub', apisub);
app.use('/apiSection',Section);
app.use('/api', api);
app.use('/apiUniversity', apiUniversity);
app.use('/apidiploma', apidiploma);
app.use('/', apiuser);

app.get('/', function(req, res) {
    res.render('index.twig');
});

app.get('/webhook/', (req, res) => {
    if (req.query['hub.verify_token'] == FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);

        setTimeout(() => {
            facebookBot.doSubscribeRequest();
        }, 3000);
    } else {
        res.send('Error, wrong validation token');
    }
});

app.post('/webhook/', (req, res) => {
    try {
        const data = JSONbig.parse(req.body);

        if (data.entry) {
            let entries = data.entry;
            entries.forEach((entry) => {
                let messaging_events = entry.messaging;
                if (messaging_events) {
                    messaging_events.forEach((event) => {
                        if (event.message && !event.message.is_echo ||
                            event.postback && event.postback.payload) {
                            facebookBot.processEvent(event);
                        }
                    });
                }
            });
        }

        return res.status(200).json({
            status: "ok"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            error: err
        });
    }

});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
    }
});

function getExtension(file) {
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}

app.use(express.static('./')); // serve all files in root folder, such as index.html

var upload = multer({
    storage: storage,
    limits: { fileSize: 1048576, files: 1 }
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([
    { name: "fileName", maxCount: 1 }
]);
app.post('/uploads', function (req, res, next) {
    var prog = progress({time:100},function(progress){
        var len = this.headers['content-length'];
        var transf = progress.transferred;
        var result = Math.round(transf/len * 100)+'%';
    });

    req.pipe(prog);
    prog.headers = req.headers;

    upload(prog, res, function (err) {
        if (err) {
            res.status(err.status || 500).json({ "error": { "status_code": err.status || 500, "message": err.code } });
            return;
        } else {

            if (prog.files.fileName) {

                res.writeHead(200,{'Content-Type':'text/html'});
                var reqJSON = JSON.stringify(prog.files.fileName, null, 2); // pretty print the JSON for <pre> tag

                res.write("<h1>Uploaded from file</h2><img style='max-width:20%' src='" + prog.files.fileName[0].path + "'/><a href='/#/upload'>Go back</a>");
                res.end();
            }
            else if (prog.body.imageUrl) {
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        console.log('content-type:', res.headers['content-type']);
                        console.log('content-length:', res.headers['content-length']);
                        request(uri).pipe(fs.createWriteStream('./uploads/' + filename)).on('close', callback);
                    });
                };
                var urlParsed = url.parse(prog.body.imageUrl);
                if (urlParsed.pathname){
                    var onlyTheFilename = urlParsed.pathname ? urlParsed.pathname.substring(urlParsed.pathname.lastIndexOf('/') + 1).replace(/((\?|#).*)?$/, '') : '';
                    var newFilename = onlyTheFilename + '-' + Date.now() + '-' + onlyTheFilename
                    var wholePath = 'uploads/' + newFilename;
                    download(urlParsed.href, newFilename, function () {
                        var reqJSON = JSON.stringify(wholePath, null, 2); // pretty print
                        res.end("<h1>Uploaded from URL</h2><img style='max-width:50%' src='" + wholePath + "'/><pre>" + reqJSON + "</pre><a href='/'>Go back</a>")

                    });
                }
            }
        }
    });
});
app.listen(REST_PORT, () => {
    console.log('Rest service ready on port ' + REST_PORT);
});

facebookBot.doSubscribeRequest();
