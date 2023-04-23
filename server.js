const express = require('express');
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate")
const path = require('path');
const UserSchema = require('./Schemas/userSchema');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/socialGym');

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
    const {id} = req.params;
    const user = new UserSchema(req.body);
    await user.save();
    res.redirect(`/${id}/dashboard`);
    console.log(user)
})
app.get('/signIn', (req,res)=>{
    res.render('pages/signIn')
});
app.get('/:id/dashboard', (req,res)=>{
    const {id} = req.params;
    const user = UserSchema.findById(id);
    res.render('pages/dashboard', {user})
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})