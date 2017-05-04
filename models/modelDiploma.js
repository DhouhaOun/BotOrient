var mongoose = require('mongoose');

module.exports = function(wagner) {

    var diploma = mongoose.model('diploma', require('./schemaaa'), 'diplomasfr');

    wagner.factory('diploma', function() {
        return diploma;
    });

    return {
        diploma: diploma
    };
};

var diploma = mongoose.model('diploma', require('./schemaaa'), 'diplomasfr');
module.exports.getdiplomas = function(callback, limit) {
    diploma.find(callback).limit(limit);
};