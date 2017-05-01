var mongoose = require('mongoose');

var SubSchema = mongoose.Schema({
    email: String
});

var subscription =module.exports = mongoose.model('subscription', SubSchema);
module.exports.allsubscription = function(callback, limit) {
    subscription.find(callback).limit(limit);
};



//ADD diploma
module.exports.addsubscription = function(subscription, callback) {
    subscription.create(subscription, callback);
};