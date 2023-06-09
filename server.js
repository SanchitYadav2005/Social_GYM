const express = require('express');
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate")
const path = require('path');
const User = require('./Schemas/userSchema');
const mongoose = require('mongoose');
const ExpressError = require('./utils/expressError');


mongoose.connect('mongodb://127.0.0.1:27017/socialGym');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));


app.get('/', (req,res)=>{
    res.render('pages/home')
})
app.get('/signUp', (req,res,next)=>{
    res.render("pages/signUp")
})
app.post('/signUp', async(req,res,next)=>{
    const user = new User(req.body);
    await user.save();
    const id = user.id
    res.redirect(`/${id}/dashboard`)
})
app.get('/:id/dashboard', (req,res,next)=>{
    const {id} = req.params;
    const user = User.findById(id);
    res.render('pages/dashboard', {user});
})

app.all("*", (req,res,next)=>{
    next(new ExpressError('page not found', 404))
})

app.use((err,req,res,next)=>{
    const{ statusCode = 500} = err;
    if(!err.message){
        err.message = "oh No, Something went wrong!"
    }
    // rendering a erro file here .
    res.status(statusCode).send(err)
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})