const { Likes } = require('../models');

class LikesRepository {
  createLikes = async (postId, userId) => {
    const likeData = await Likes.create({
      UserId: userId,
      PostId: postId,
    });
    return likeData;
  };

  findLike = async (postId, userId) => {
    const existsLike = await Likes.findOne({
      where: { PostId: postId, UserId: userId },
    });
    return existsLike;
  };

  deleteLikes = async (postId, userId) => {
    await Likes.destroy({
      where: { PostId: postId, UserId: userId },
    });
    return;
  };
}

module.exports = LikesRepository;

//여기서 답을 두개줄 수 있다
