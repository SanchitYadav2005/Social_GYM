const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostControllers');


router.get('/posts', (req,res)=>{
    res.render('pages/posts')
})
router.get('/createPost', postController.sendPostForm);
router.post('/createPost', postController.createPost);

module.exports = router;