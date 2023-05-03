const express = require('express');
const router = express.Router();

const LikesController = require('../controllers/likes.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const likesController = new LikesController();

//게시글에 좋아요, 취소하기
router.put('/:postId/likes', authMiddleware, likesController.putLikes);

//좋아요 게시글 조회하기
// router.get('/posts/:postId/likes', authMiddleware, likesController.getLikes);

module.exports = router;
