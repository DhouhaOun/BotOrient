const mongoose = require('mongoose');

// Job Schema
var jobSchema = mongoose.Schema({
	name:{
		type: String,
		required: true,
        minlength:1
	},
	category:{
		type: String,
		required: true
	},
	description:{
		type: String,
        minlength:1
	},
	image_url:{
		type: String
	}
});

var Job = module.exports = mongoose.model('Job', jobSchema);





