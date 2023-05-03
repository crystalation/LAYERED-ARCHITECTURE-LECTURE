//routes에 index.js가 갖는 의미가 뭔지?

const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');
const likesRouter = require('./likes.routes');

router.use('/posts/', [postsRouter, commentsRouter, likesRouter]);
router.use('/signup/', signupRouter);
router.use('/login/', loginRouter);

module.exports = router;
