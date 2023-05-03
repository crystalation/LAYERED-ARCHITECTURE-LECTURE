const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();
  //CommentsService 클래스를 컨트롤러 클래스의 멤버 변수로 할당함.

  //댓글 작성
  createComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const postId = req.params.postId;
      const { content } = req.body;

      const post = await this.commentsService.findCommentById(postId);
      if (!post) {
        return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      }

      const commentsData = await this.commentsService.createComment(
        userId,
        postId,
        content
      );

      res.status(201).json({ data: commentsData });
    } catch (err) {
      res.status(400).json({ message: '댓글작성에 실패하였습니다.' });
    }
  };

  //댓글 조회
  getComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comment = await this.commentsService.findCommentById(postId);

      res.status(201).json({ data: comment });
    } catch (err) {
      res.status(400).json({ message: '댓글조회에 실패하였습니다.' });
    }
  };

  //댓글 수정
  putComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;

      //해당 게시글이 있는지 확인
      const existsPost = await this.commentsService.findPost(postId);
      if (!existsPost) {
        return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      }
      //게시글이 있다면 comment 수정
      const existsComment = await this.commentsService.putComment(
        commentId,
        content
      );
      res.status(201).json({ message: '댓글을 수정했습니다.', existsComment });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: '댓글 수정에 실패했습니다.' });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      //게시글이 있는지 확인
      const existsPost = await this.commentsService.findPost(postId);
      const existsComment = await this.commentsService.findCommentById(
        commentId
      );

      if (!existsPost) {
        return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      }

      if (!existsComment) {
        return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });
      }

      //조건을 통과하면 게시글을 삭제
      //return값은 어떻게 줘야되나?
      await this.commentsService.deleteComment(commentId);

      res.json({ message: '댓글을 삭제했습니다.' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: '댓글 삭제에 실패했습니다.' });
    }
  };
}

module.exports = CommentsController;

// const commentsData = await this.commentsService.createComment(
//   userId,
//   postId,
//   content
// );
