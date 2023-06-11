const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const passort = require('passport');
const passport = require('passport');

router.route('/signUp')
    .get(userController.signUp)
    .post(userController.createUser)
router.route('/:id/dashboard')
    .get(userController.dashboard)
router.get('/signIn', (req,res)=>{
    res.render('pages/signIn')
})
router.post('/signIn',passport.authenticate('local', {failureMessage:"error", failureRedirect: '/signIn'}), (req,res)=>{
    res.redirect('/')
})

module.exports = router