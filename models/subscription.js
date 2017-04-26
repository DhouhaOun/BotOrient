var mongoose = require('mongoose');

var SubSchema = mongoose.Schema({
    email: String
});

module.exports = mongoose.model('Subscription', SubSchema);