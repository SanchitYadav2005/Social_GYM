const mongoose = require("mongoose");
const {Schema} = mongoose;



const postSchmea = new Schema({
    images: {
        url: String,
        filename: String
    },
    title: String,
    description: String
});

module.exports = mongoose.model('PostSchmea', postSchmea)