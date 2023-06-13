const express = require('express');
const router = express.Router();

router.get('/posts', (req,res)=>{
    res.send(" posts will display here!")
})
router.get("/createPost", (req,res)=>{
    res.send("you post will be created here")
})

module.exports = router;