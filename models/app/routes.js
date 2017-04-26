// Dependencies
var mongoose        = require('mongoose');
var Univer          = require('./model.js');
var express = require('express');
// Opens App Routes
var app = express.Router();

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/univers', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Univer.find({});
        query.exec(function(err, univers){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(univers);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/univers', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuniver = new Univer(req.body);

        // New User is saved in the db.
        newuniver.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var private            = req.body.private;
        var public          = req.body.public;
        var other           = req.body.other;


        var reqVerified     = req.body.reqVerified;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Univer.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});
        }

        // ...include filter by Gender (all options)
        if(public || private || other){
            query.or([{ 'gender': public }, { 'gender': private }, {'gender': other}]);
        }







        // ...include filter for HTML5 Verified Locations
        if(reqVerified){
            query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        }

        // Execute Query and Return the Query Results
        query.exec(function(err, univers){
            if(err)
                res.send(err);


            res.json(univers);
        });
    });
    module.exports = app;