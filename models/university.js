var mongoose = require('mongoose');


var universitySchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	category:{
		type: String,
        required: true

	},
	adresse:{
		type: String,
        minlength:1
	},

	image_url:{
		type: String
	}

}
    ,{collection : "university"}
);

var University = module.exports = mongoose.model('University', universitySchema);
