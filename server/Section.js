/**
 * Created by WAEL on 17/04/2017.
 */
var express = require('express');
var router = express.Router();
var Section = require('../models/Section');

//Get Sections

router.get('/sections',function (req, res) {
    Section.find(function (err, sections) {
       if(err)
           res.send(err);

       res.json(sections);
    });
});

//Get Single Section
router.get('/sections/:_id',function(req, res){
    Section.findById(req.params._id,function(err,section){
        if(!section)
            return res.status(404).send();
        res.status(200).send(section);
    });
});

//Post a Section
router.post('/sections',function (req, res) {

    Section.create(req.body, function (err, section) {
       if(!section)
           return res.status(404).send();
       res.status(200).send(section);
    });
});

//Edit a Section
router.put('/sections/:_id',function(req, res) {
   Section.findByIdAndUpdate(req.params._id,req.body,function(){
       res.json({"success":true});
   })
});

//Delete a Section (it won't be needed cause logically we won't delete a Section)
router.delete('/sections/:_id',function (req, res) {
   Section.findByIdAndRemove(req.params._id,function(err, section){
       if(!section)
           return res.status(404).send();
       res.status(200).send(section);
   })
});



module.exports = router;