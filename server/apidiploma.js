
var express = require('express');
var mongoose         = require("mongoose");
var app = express.Router();



Diploma = require('../models/diploma');
//modification

app.get('/diplomas',function (req,res) {
    Diploma.getDiplomas(function (err, diplomas) {
        if(err){
            throw err;
        }
        res.json(diplomas);
    })
});
app.get('/diplomas/:_id',function (req,res) {
    Diploma.getDiplomaById(req.params._id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

app.post('/diplomas',function (req,res) {
    var diploma = req.body;
    Diploma.addDiploma(diploma, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});
app.put('/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    var diploma = req.body;
    Diploma.updateDiploma(id, diploma, {}, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});

app.delete('/diplomas/:_id',function (req,res) {
    var id = req.params._id;
    Diploma.removeDiploma(id, function (err, diploma) {
        if(err){
            throw err;
        }
        res.json(diploma);
    })
});


app.get('/diplomas/genrebts/:genre', function(req, res) {
    Diploma.finddiplomasgenre({genre:'BTS'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/diplomas/genrelicense/:genre', function(req, res) {
    Diploma.finddiplomasgenrelicense({genre:'Licenses'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/diplomas/genreing/:genre', function(req, res) {
    Diploma.finddiplomasgenreing({genre:'Engineering'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});
app.get('/diplomas/genremasters/:genre', function(req, res) {
    Diploma.finddiplomasgenremaster({genre:'Masters'},function (err,diplomas) {
        if(err)
            return res.json(err);
        res.json(diplomas);
    })
});





module.exports = app;