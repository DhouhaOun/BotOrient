var express = require('express');

var subscription = require('../models/subscription');
var router = express.Router();



router.post('/subsribe', function (req, res) {
    var user = {
        email: req.body.email
    };

    var sub = new subscription({
        email: user.email
    });

    sub.save(function (err, model) {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        console.log('New subscription { '+ user.email +' } has been saved successfully!');
    });


});

module.exports = router;
