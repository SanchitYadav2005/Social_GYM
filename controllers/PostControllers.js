const catchAsync = require('../utils/catchAsync');
const Post = require('../Schemas/postSchema');

module.exports.sendPostForm = (req,res)=>{  
    res.render('pages/createPost');
}