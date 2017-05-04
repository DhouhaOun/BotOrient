
var express = require('express');
var router = express.Router();



diploma = require('../models/modelDiploma');


router.get('/diplomas',function (req,res) {
    diploma.getdiplomas(function (err, diplomas) {
        if(err){
            throw err;
        }
        res.json(diplomas);
    })
});









module.exports = router;