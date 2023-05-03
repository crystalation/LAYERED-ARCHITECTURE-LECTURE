const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const commentsController = new CommentsController();
//여기까지 쭉 파일을 다 읽어온 후에

//게시물에 댓글 작성하기
//api/posts/:postId/comments
router.post(
  '/:postId/comments',
  authMiddleware,
  commentsController.createComment
);

//게시물의 댓글 가져오기
//api/posts/:postId/comments
router.get('/:postId/comments', authMiddleware, commentsController.getComment);

//특정댓글 수정하기
router.put(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentsController.putComment
);

//특정댓글 삭제하기
router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
