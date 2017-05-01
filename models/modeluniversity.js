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

