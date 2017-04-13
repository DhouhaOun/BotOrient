var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            google:   {
                id:    String,
                token: String
            },
            facebook: {
                id: String,
                token: String,
                email: String,
                displayname: String,
                gender: String,
                birthday:  String
            },
            google: {
                id: String,
                token: String,
                email: String,
                name: String},
            firstName: String,
            lastName: String,
            email: String,
            gender:String,
            create_date:{
                type: Date,
                default: Date.now
            },
            roles: [String]
        }, {collection: "user"});
    mongoose.Promise = global.Promise;
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        getMongooseModel: getMongooseModel,
        countuser :countuser
    };
    return api;



    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findAllUsers() {
        return UserModel.find();
    }
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function getMongooseModel() {
        return UserModel;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
    function countuser()
    {//console.log(UserModel.find().count({gender:'Female'}));
      return UserModel.find().count({gender:'Female'},function(err,count){
           count1 = count;

      });
    }


}