const catchAsync = require('../utils/catchAsync');
const Post = require('../Schemas/postSchema');

module.exports.createPostForm = (req,res)=>{
    res.render('pages/createPost');
}