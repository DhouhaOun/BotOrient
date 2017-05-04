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
var job = mongoose.model('job', require('./schema'), 'jobs');
module.exports.getjobs = function(callback, limit) {
    job.find(callback).limit(limit);
};