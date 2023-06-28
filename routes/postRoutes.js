const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostControllers');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

router.get('/posts', (req,res)=>{
    res.render('pages/posts')
})
router.get('/createPost', postController.sendPostForm);
router.post('/createPost',upload.array('images'), postController.createPost);

module.exports = router;