const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
});

userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', userSchema);