var mongoose = require('mongoose');

module.exports = function(wagner) {

    var university = mongoose.model('university', require('./schema'), 'university');

    wagner.factory('university', function() {
        return university;
    });

    return {
        university:university
    };
};
var university = mongoose.model('university', require('./schema'), 'university');
module.exports.getuniversity = function(callback, limit) {
    university.find(callback).limit(limit);
};