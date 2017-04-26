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

app.listen(REST_PORT, () => {
    console.log('Rest service ready on port ' + REST_PORT);
});

facebookBot.doSubscribeRequest();
