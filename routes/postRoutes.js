const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostControllers');
const {storage} = require('../cloudinary')
const multer = require('multer');
const upload = multer({storage})

router.get('/posts', (req,res)=>{
    res.render('pages/posts')
})
router.get('/createPost', postController.sendPostForm);
router.post('/createPost',upload.array('photos'), postController.createPost);

module.exports = router;