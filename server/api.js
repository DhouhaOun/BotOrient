
var express = require('express');
var router = express.Router();
var Job =require('../models/job');




router.get('/jobs', function(req, res) {
    Job.find(function (err,Job) {
        if(err)
            return res.status(404).send();
        res.status(200).send(Job);
    })
});

router.get('/jobs/:_id', function(req, res) {
    Job.findById(req.params._id,function (err,Job) {
        if(err)
            return res.status(404).send();
        res.status(200).send(Job);
    })
});
router.put('/jobs/:_id', function(req, res) {
    Job.findByIdAndUpdate(req.params._id,req.body,function () {
        res.json({"success":true});
    })
});
router.post('/jobs', function(req, res) {
    var job = req.body;
    Job.create(job, function (err, job) {
        if(err)
            return res.status(404).send();
        res.status(200).send(Job);
    });

});



router.delete('/jobs/:_id', function(req, res)  {

    var id = req.params._id;

    Job.findByIdAndRemove(id, function(err, job)  {
        if(err){
            throw res.status(404).send();
        }
        res.status(200).send(job);
    });
});
module.exports = router;
