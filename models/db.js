
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds123050.mlab.com:23050/testfb');
module.exports=mongoose;