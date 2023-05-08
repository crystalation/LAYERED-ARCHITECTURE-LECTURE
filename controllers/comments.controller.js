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
        throw new Error({ message: '게시글이 존재하지 않습니다.' });
      }

      const commentsData = await this.commentsService.createComment(
        userId,
        postId,
        content
      );

      res.status(201).json({ data: commentsData });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/댓글 작성에 실패했습니다.');
    }
  };

  //댓글 조회
  getComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comment = await this.commentsService.findCommentById(postId);

      res.status(201).json({ data: comment });
    } catch (error) {
      throw new Error(error.message || '400/댓글 조회에 실패했습니다.');
    }
  };

  //댓글 수정
  putComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;

      //해당 게시글이 있는지 확인, 없으면 에러날림
      await this.commentsService.findPost(postId);
      //게시글이 있다면 commentId를 통해 찾음
      //comment 없다면 댓글 없음 에러 날림
      //댓글이 있으면 수정
      await this.commentsService.putComment(commentId, content);

      res.status(201).json({ message: '댓글을 수정했습니다.', existsComment });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/댓글 수정에 실패했습니다.');
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      //게시글이 있는지 확인
      await this.commentsService.findPost(postId);
      //게시글이 없으면 service에서 에러 날림
      await this.commentsService.findCommentById(commentId);

      //조건을 통과하면 게시글을 삭제

      await this.commentsService.deleteComment(commentId);

      res.json({ message: '댓글을 삭제했습니다.' });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/댓글 삭제에 실패했습니다.');
    }
  };
}

module.exports = CommentsController;
