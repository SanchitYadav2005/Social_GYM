const catchAsync = require('../utils/catchAsync');
const Post = require('../Schemas/postSchema');


module.exports.sendPostForm = (req,res)=>{  
    res.render('pages/createPost');
}

module.exports.createPost = catchAsync(async (req,res)=>{
    const post = new Post(req.body)
    post.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await post.save()
    res.redirect('/posts')
})