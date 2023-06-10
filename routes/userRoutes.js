const express = require('express');
const router = express.Router()
const userController = require('../controllers/UserController');
const passort = require('passport');

router.route('/signUp')
    .get(userController.signUp)
    .post(userController.createUser)
router.route('/:id/dashboard')
    .get(userController.dashboard)
router.route('/signIn')
    .get(userController.signIn)
    .post(userController.loginUser)

module.exports = router