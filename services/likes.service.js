const LikesRepository = require('../repositories/likes.repository');

class LikesService {
  likesRepository = new LikesRepository();

  //좋아요할 게시물이 있는지 찾아보기
  findOnePost = async (postId) => {
    const existsPost = await this.likesRepository.findOnePost(postId);
    return existsPost;
  };

  //이미 좋아요 되있는지 찾아보기
  findLike = async (postId, userId) => {
    const existsLike = await this.likesRepository.findLike(postId, userId);
    return existsLike;
  };

  //좋아요 등록하기
  putLikes = async (postId, userId) => {
    const createLike = await this.likesRepository.createLikes(postId, userId);
    return createLike;
  };

  //게시글 likes 숫자 증가시키기
  addLike = async (postId) => {
    await this.likesRepository.addLike(postId);
    return;
  };

  //게시글 likes 숫자 감소시키기
  dropLike = async (postId) => {
    await this.likesRepository.dropLike(postId);
    return;
  };

  //좋아요 취소하기
  deleteLikes = async (postId, userId) => {
    await this.likesRepository.deleteLikes(postId, userId);
    return;
  };

  //좋아요 누른 게시글 조회하기
  findPostLikes = async (userId) => {
    const LikePosts = await this.likesRepository.findLikePosts(userId);
    return LikePosts;
  };
}

module.exports = LikesService;
