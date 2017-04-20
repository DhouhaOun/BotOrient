/**
 * Created by WAEL on 17/04/2017.
 */
var mongoose = require ('mongoose');
var universitySchema = require("../models/university");
var sectionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    image_url:{
        type:String
    },

},
    {collection : "section"}
);

var Section = module.exports = mongoose.model('Section',sectionSchema);