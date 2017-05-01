const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();



sub = require('../models/subscription');


router.get('/sub',function (req,res) {
   sub.allsubscription(function (err, subs) {
        if(err){
            throw err;
        }
        res.json(subs);
    })
});



router.post('/add', function(req, res) {
    var subs = req.body;
    sub.create(subs, function (err, subs) {
        if(err)
            return res.status(404).send();
        res.status(200).send(sub);
    });

});
router.post('/sendnews',function(req,res){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ouni.nabila87@gmail.com',
                pass: 'ISITcom2016'
            }
        });

// setup email data with unicode symbols

        var emails = [];

    sub.allsubscription(function (err, subs) {
        if(err){
            throw err;
        }else{
                    for (var i=0; i<subs.length; i++){
                        if(subs[i].email !=  undefined){

                            emails.push(subs[i].email);
                            console.log(subs[i].email);
                        }
                    }
                    res.status(200).send("ok");

                }}



            );

        let mailOptions = {
            from: '"Bot" <ouni.nabila87@gmail.com>', // sender address
            to: emails, // list of receivers
            subject: req.query.subject, // Subject line
            text: req.query.text, // plain text body
            html: req.query.text // html body
        };
// send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message %s sent: %s', info.messageId, info.response);


        });

    });


module.exports = router;