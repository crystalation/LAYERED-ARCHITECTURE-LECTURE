const { Posts, Comments } = require('../models');

class CommentsRepository {
  createComment = async (postId, userId, content) => {
    const commentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment: content,
    });

    return commentData;
  };

  findallCommentById = async (postId) => {
    const commentData = await Comments.findAll({
      where: { PostId: postId },
      //order는 sequelize쿼리에서 결과를 정렬할때 사용
      //findAll에서 order로 createdAt 기준으로 내림차순
      order: [['createdAt', 'DESC']],
    });
    return commentData;
  };

  //댓글수정하기
  //댓글이 달린 게시글이 있는지 확인
  findPost = async (postId) => {
    const existsPost = await Posts.findByPk(postId);
    return existsPost;
  };

  //해당 댓글이 있는지 확인
  findCommentById = async (commentId) => {
    const existsComment = await Comments.findByPk(commentId);
    return existsComment;
  };

  //댓글을 수정
  putComment = async (commentId, content) => {
    //db에서 commentId기반으로 댓글을 찾는다
    const existsComment = await Comments.findByPk(commentId);
    existsComment.comment = content;

    await existsComment.save();
    return existsComment;
  };

  //댓글삭제
  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
    return;
  };
}

module.exports = CommentsRepository;
