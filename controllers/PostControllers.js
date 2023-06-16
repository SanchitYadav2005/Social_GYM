const catchAsync = require('../utils/catchAsync');
const Post = require('../Schemas/postSchema');

module.exports.sendPostForm = (req,res)=>{  
    res.render('pages/createPost');
}

module.exports.createPost = catchAsync(async (req,res)=>{
    const post = new Post(req.body)
    await post.save()
    res.redirect('/posts')
})