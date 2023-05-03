//app.js
const express = require('express');
const app = express();
const port = 3000;
// const postsRouter = require('./routes/posts.routes');
const router = require('./routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
