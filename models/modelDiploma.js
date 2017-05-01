var mongoose = require('mongoose');

module.exports = function(wagner) {

    var diploma = mongoose.model('diploma', require('./schemaaa'), 'diplomas');

    wagner.factory('diploma', function() {
        return diploma;
    });

    return {
        diploma: diploma
    };
};
