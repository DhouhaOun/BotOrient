var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var scraper = require('../server/scrapper');

module.exports = function(wagner) {
    var api = express.Router();

    // Parse the body of the request before
    // any other handler get executed.
    api.use(bodyparser.json());

    api.post('/paginate', wagner.invoke(function(diploma) {
            return function(req, res) {
                scraper(wagner, req.body.npages)
                    .then(function(){
                        diploma
                            .find({})
                            .select({title: 1, numComments: 1, _id: 0})
                            .exec(function(error, pages) {
                                if (error) {
                                    return res.
                                    status(status.INTERNAL_SERVER_ERROR).
                                    json({ error: error.toString() });
                                }
                                res.json({ pages: pages });
                            });
                    });
            }
        })
    );
    return api;
};