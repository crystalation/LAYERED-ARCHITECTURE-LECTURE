//순서대로 실행된다는 것을 인지하자!!

const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
//여기까지 쭉 파일을 다 읽어온 후에

router.get('/', postsController.getPosts);
router.post('/', postsController.createPost);

module.exports = router;
