//app.js
const express = require('express');
require('express-async-errors');
const app = express();
const port = 3000;
// const postsRouter = require('./routes/posts.routes');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json()); //()
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
