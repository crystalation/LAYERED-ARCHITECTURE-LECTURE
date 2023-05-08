const { Likes, Posts, Users } = require('../models');

class LikesRepository {
  //좋아요할 게시물이 있는지 찾기
  findOnePost = async (postId) => {
    const existsPost = await Posts.findOne({
      where: { PostId: postId },
    });
    return existsPost;
  };

  //이미 좋아요를 눌렀는지 확인하기
  //Likes 테이블에 {postId, userId}가 있는지 확인

  findLike = async (postId, userId) => {
    const existsLike = await Likes.findOne({
      where: { PostId: postId, UserId: userId },
    });
    return existsLike;
  };

  //좋아요를 등록하기
  createLikes = async (postId, userId) => {
    const likeData = await Likes.create({
      UserId: userId,
      PostId: postId,
    });
    return likeData;
  };

  //좋아요를 등록하면 해당 게시글의 좋아요 수가 올라감
  addLike = async (postId) => {
    const addLike = await Posts.increment('likes', {
      where: { postId },
    });
    return addLike;
  };

  //좋아요를 취소하기
  deleteLikes = async (postId, userId) => {
    await Likes.destroy({
      where: { PostId: postId, UserId: userId },
    });
    return;
  };

  //좋아요를 취소하면 해당 게시글의 좋아요 수도 줄어든다
  dropLike = async (postId) => {
    const dropLike = await Posts.decrement('likes', {
      where: { postId },
    });

    return dropLike;
  };

  //좋아요한 게시물 찾기, 게시물 작성자는 N
  findLikePosts = async (userId) => {
    const LikePosts = await Posts.findAll({
      //nickname을 끌어와서 포함시킨  모든 게시물을 찾아와
      attributes: [
        'postId',
        'UserId',
        'title',
        'likes',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        // Likes 테이블에서 로그인한 회원이 좋아요를 누른 게시물만 선택하도록 필터링 역할함
        {
          model: Likes,
          attributes: [],
          where: { UserId: userId },
        },
      ],
      order: [['likes', 'DESC']],
    });
    console.log(LikePosts);
    return LikePosts;
  };
}

module.exports = LikesRepository;
