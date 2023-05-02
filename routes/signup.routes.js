//signup.routes.js
//회원가입 라우터
const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

//api로 들어와서
router.post('/', signupController.createSignup);

module.exports = router;
