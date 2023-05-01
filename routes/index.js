//routes에 index.js가 갖는 의미가 뭔지?

const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const signupRouter = require('./signup.routes');
router.use('/posts/', postsRouter);
router.use('/signup/', signupRouter);

module.exports = router;
