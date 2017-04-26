var mongoose = require('mongoose');

//diplomas Schema

var diplomaSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    genre:{
        type: String,
        required:true
    },
    description:{
        type: String
    },

    create_date:{
        type: Date,
        default: Date.now
    }
});
var Diploma = module.export = mongoose.model('Diploma', diplomaSchema);

//GET diplomas
module.exports.getDiplomas = function(callback, limit) {
    Diploma.find(callback).limit(limit);
};

//Get diploma
module.exports.getDiplomaById = function(id, callback) {
    Diploma.findById(id, callback);

};
module.exports.finddiplomasgenre = function(genre, callback) {
    Diploma.find(genre,callback);
};
module.exports.finddiplomasgenreing = function(genre, callback) {
    Diploma.find(genre,callback);
};
module.exports.finddiplomasgenremaster = function(genre, callback) {
    Diploma.find(genre,callback);
};
module.exports.finddiplomasgenrelicense = function(genre, callback) {
    Diploma.find(genre,callback);
};

//ADD diploma
module.exports.addDiploma = function(diploma, callback) {
    Diploma.create(diploma, callback);
};

//Update diploma
module.exports.updateDiploma = function (id, diploma, options, callback) {
    var query = {_id: id};
    var update = {
        title:diploma.title,
        genre:diploma.genre,
        description:diploma.description

    };
    Diploma.findOneAndUpdate(query, update, options, callback);
};


//Delete diploma
module.exports.removeDiploma = function(id,callback) {
    var query = {_id: id};
    Diploma.remove(query, callback);
};