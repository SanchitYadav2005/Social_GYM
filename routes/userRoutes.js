const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const passport = require('passport');

router.route('/signUp')
    .get(userController.signUp)
    .post(userController.createUser)

router.route('/:id/dashboard')
    .get(userController.dashboard)

router.route('/signIn')
    .get(userController.signIn)
    .post(
        passport.authenticate('local', 
        {
            failureMessage:"error", 
            failureRedirect: '/signIn', 
            keepSessionInfo: true
        }), 
        userController.login)
router.route('/:id/edit')
        .get(userController.editUserForm)
        .put(userController.editUser)
module.exports = router