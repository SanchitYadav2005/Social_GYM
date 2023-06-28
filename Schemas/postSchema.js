const mongoose = require("mongoose");
const {Schema} = mongoose;


const ImageSchema = new Schema({
    url: String,
    filename: String
})
const postSchmea = new Schema({
    image: [ImageSchema],
    title: String,
    description: String
});

module.exports = mongoose.model('PostSchmea', postSchmea)