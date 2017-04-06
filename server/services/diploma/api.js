
var express = require('express');
var router = express.Router();



Diploma = require('../../models/diploma');


router.get('/api/diplomas',function (req,res) {
    Diploma.getDiplomas(function (err, diplomas) {
        if(err){
            throw err;
        }
        res.json(diplomas);
    })
});

router.get('/api/diplomas/:_id',function (req,res) {
    Diploma.getDiplomaById(req.params._id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.post('/api/diplomas',function (req,res) {
    var diploma = req.body;
    Diploma.addDiploma(diploma, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.put('/api/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    var diploma = req.body;
    Diploma.updateDiploma(id, diploma, {}, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

router.delete('/api/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    Diploma.removeDiploma(id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});


router.get('api/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});






module.exports = router;