const express = require('express');
const router = express.Router();

router.get('/posts', (req,res)=>{
    res.render('pages/posts')
})
router.get("/createPost", (req,res)=>{
    res.send("you post will be created here")
})

module.exports = router;