const mongoose = require("mongoose");
const {Schema} = mongoose;



const postSchmea = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('PostSchmea', postSchmea)