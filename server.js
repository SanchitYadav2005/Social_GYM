const express = require('express');
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate")
const path = require('path');
const User = require('./Schemas/userSchema');
const mongoose = require('mongoose');
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const { error } = require('console');


mongoose.connect('mongodb://127.0.0.1:27017/socialGym');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req,res)=>{
    res.render('pages/home')
})
app.get('/signUp', (req,res)=>{
    res.render('pages/signUp')
});
app.post('/signUp', async (req,res)=>{
    const {id} = req.params;
    const user = new User(req.body);
    await user.save();
    res.redirect(`/${id}/dashboard`);
    console.log(user)
})
app.get('/signIn', (req,res)=>{
    res.render('pages/signIn')
});
app.post('/signIn', passport.authenticate('local', {failureMessage: error}), (req,res)=>{
    console.log(req.body)
    res.redirect('/dashboard')
})
app.get('/:id/dashboard', (req,res)=>{
    const {id} = req.params;
    const user = User.findById(id);
    res.render('pages/dashboard', {user})
})
app.get('/dashboard',(req,res)=>{
    res.send("authencation is working!")
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})