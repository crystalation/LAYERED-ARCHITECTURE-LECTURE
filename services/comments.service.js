const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
  commentsRepository = new CommentsRepository();

  createComment = async (userId, postId, content) => {
    const commentData = await this.commentsRepository.createComment(
      userId,
      postId,
      content
    );
    return commentData;
  };

  findCommentById = async (postId) => {
    const allcomments = await this.commentsRepository.findallCommentById(
      postId
    );

    // //호출한 comments들을 가장 최신부터 정렬
    // allcomments.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // });

    return allcomments.map((comment) => {
      // console.log(comment);

      //이부분에서 주의해야함
      return {
        commentId: comment.commentId,
        UserId: comment.UserId,
        PostId: comment.PostId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  findPost = async (postId) => {
    const existsPost = await this.commentsRepository.findPost(postId);
    return existsPost;
  };

  findCommentById = async (commentId) => {
    const existsComment = await this.commentsRepository.findCommentById(
      commentId
    );
    return existsComment;
  };

  putComment = async (commentId, content) => {
    const comment = await this.commentsRepository.putComment(
      commentId,
      content
    );

    return {
      commentId: comment.commentId,
      UserId: comment.UserId,
      PostId: comment.PostId,
      comment: comment.comment,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  };

  deleteComment = async (commentId) => {
    await this.commentsRepository.deleteComment(commentId);
    return;
  };
}

module.exports = CommentsService;
