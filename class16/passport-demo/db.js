var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({ });

// NOTE: we're using passport-local-mongoose as a plugin
// our schema for user looks pretty thin... but that's because
// the plugin inserts salt, password and username
UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/class16db');
// User.register (creating a new user)
// User.authenticate (strategy)









