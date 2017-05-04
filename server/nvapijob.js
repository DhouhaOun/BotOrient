
var express = require('express');
var router = express.Router();



job = require('../models/modeljobs');


router.get('/job',function (req,res) {
job.getjobs(function (err, jobs) {
        if(err){
            throw err;
        }
        res.json(jobs);
    })
});









module.exports = router;