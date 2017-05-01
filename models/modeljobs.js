var mongoose = require('mongoose');

module.exports = function(wagner) {

    var job = mongoose.model('job', require('./schema'), 'jobs');

    wagner.factory('job', function() {
        return job;
    });

    return {
        job:job
    };
};

