//login.routes.js
//로그인 라우터
const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/', loginController.login);

module.exports = router;
