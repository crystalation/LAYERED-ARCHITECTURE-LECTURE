//순서대로 실행된다는 것을 인지하자!!
//signup.routes.js
const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

//api로 들어와서
router.post('/', signupController.createSignup);

module.exports = router;
