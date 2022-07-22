const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login);

router.route('/logout').get(authController.logout);

module.exports = router;
