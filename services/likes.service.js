const LikesRepository = require('../repositories/likes.repository');

class LikesService {
  likesRepository = new LikesRepository();

  findLike = async (postId, userId) => {
    const existsLike = await this.likesRepository.findLike(postId, userId);
    return existsLike;
  };

  putLikes = async (postId, userId) => {
    const createLike = await this.likesRepository.createLikes(postId, userId);
    return createLike;
  };

  deleteLikes = async (postId, userId) => {
    await this.likesRepository.deleteLikes(postId, userId);
    return;
  };
}

module.exports = LikesService;

//좋아요를 등록하고 취소하는 과정이
//PUT
//1. 좋아요를 등록하는거-등록하였습니다.
//2. 좋아요를 취소하는거-취소하였습니다.
