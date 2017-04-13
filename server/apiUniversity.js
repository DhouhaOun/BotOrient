/**
 * Created by ASUS on 24/03/2017.
 */
var express = require('express');

var router = express.Router();
var University =require('../models/university');
router.get('/', function(req, res){
    res.send('welcome');
});

router.get('/universitys', function(req, res) {
    University.find(function (err,University) {  //userlist :model  //userlist:resultat
        if(err)
            return res.json(err);
        res.json(University);


    })
});

router.get('/universitys/:_id', function(req, res) {
    University.findById(req.params._id,function (err,university) {
       /* if(err)
            return res.json(err);
        res.json(university);
*/
        if(!university)
            return res.status(404).send();

        res.status(200).send(university);
    })
});
router.post('/universitys', function(req, res) {
    var university = req.body;
    University.create(university, function (err, university) {
        /*if(err)
            return res.json(err);
        res.json(University);*/
        if(!university)
            return res.status(404).send();

        res.status(200).send(university);
    });

});

router.put('/universitys/:_id', function(req, res) {
    University.findByIdAndUpdate(req.params._id,req.body,function () {
        res.json({"success":true});
    })
});

router.delete('/universitys/:_id', function(req, res)  {

    var id = req.params._id;

    University.findByIdAndRemove(id, function(err, university)  {
       /* if(err){
            throw err;
        }
        res.json(university);*/
        if(!university)
            return res.status(404).send();

        res.status(200).send(university);
    });
});
module.exports = router;