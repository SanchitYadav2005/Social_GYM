if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const port = 8080;
const ejsMate = require("ejs-mate")
const path = require('path');
const mongoose = require('mongoose');
const ExpressError = require('./utils/expressError');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const User = require('./Schemas/userSchema')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const postRoutes = require('./routes/postRoutes');
// const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/socialGym');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
// app.use(methodOverride("_method"))

const sessionConfig = {
    name: 'session',
    secret: 'she is mine',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// app.get('/fakeUser', async(req,res)=>{
//     const user = new User({fname: 'sanchit', lname: 'yadav', username:'syadav'})
//     const newUser = await User.register(user, 'cicken')
//     res.send(newUser);
// })

app.use('/', userRoutes)
app.use('/', postRoutes)

app.get('/', (req,res)=>{
    res.render('pages/home')
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
    res.status(statusCode)
})

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
})