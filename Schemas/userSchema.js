const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
    passowrd: String
})



module.exports = mongoose.model('UserSchema', userSchema);;