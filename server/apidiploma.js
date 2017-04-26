
var express = require('express');
var router = express.Router();



Diploma = require('../models/diploma');


router.get('/diplomas',function (req,res) {
    Diploma.getDiplomas(function (err, diplomas) {
        if(err){
            throw err;
        }
        res.json(diplomas);
    })
});

router.get('/diplomas/:_id',function (req,res) {
    Diploma.getDiplomaById(req.params._id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.post('/diplomas',function (req,res) {
    var diploma = req.body;
    Diploma.addDiploma(diploma, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.put('/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    var diploma = req.body;
    Diploma.updateDiploma(id, diploma, {}, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.delete('/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    Diploma.removeDiploma(id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});




router.get('/diplomas/genrebts/:genre', function(req, res) {
    Diploma.finddiplomasgenre({genre:'BTS'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
router.get('/diplomas/genrelicense/:genre', function(req, res) {
    Diploma.finddiplomasgenrelicense({genre:'Licenses'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
router.get('/diplomas/genreing/:genre', function(req, res) {
    Diploma.finddiplomasgenreing({genre:'Engineering'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
router.get('/diplomas/genremasters/:genre', function(req, res) {
    Diploma.finddiplomasgenremaster({genre:'Masters'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});




module.exports = router;