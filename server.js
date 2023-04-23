const express = require('express');
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate")
const path = require('path');
const UserSchema = require('./Schemas/userSchema');
const mongoose = require('mongoose');




app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.render('pages/home')
})
app.get('/signUp', (req,res)=>{
    res.render('pages/signUp')
});
app.post('/signUp', async (req,res)=>{
    const {fname, lname, username, passowrd} = req.body;
    const user = new UserSchema(fname, lname,username,passowrd);
    await user.save();
})
app.get('/signIn', (req,res)=>{
    res.render('pages/signIn')
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})