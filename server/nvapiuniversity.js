
var express = require('express');
var router = express.Router();



university = require('../models/modeluniversity');


router.get('/university',function (req,res) {
    university.getuniversity(function (err, universitys) {
        if(err){
            throw err;
        }
        res.json(universitys);
    })
});









module.exports = router;