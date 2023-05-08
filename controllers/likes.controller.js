const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();
  putLikes = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      //좋아요 테이블 안에 좋아요하고자 하는 postId가 있는지부터 찾아야함, 없다면 error
      const existsPost = await this.likesService.findOnePost(postId);

      //좋아요 table에 해당 postId가 있다면 좋아요 취소
      const existsLike = await this.likesService.findLike(postId, userId);

      if (existsLike) {
        await this.likesService.deleteLikes(postId, userId);
        await this.likesService.dropLike(postId);
        return res.status(201).json({
          message: '좋아요를 취소했습니다.',
        });
      }

      //좋아요할 게시글이 없으면 좋아요를 등록하지 못함
      //postId의 게시글이 있는지 확인

      if (existsPost) {
        const createLike = await this.likesService.putLikes(postId, userId);
        await this.likesService.addLike(postId);
        res.status(201).json({ message: '좋아요를 추가했습니다.', createLike });
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/좋아요 등록에 실패했습니다.');
    }
  };

  getLikes = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const posts = await this.likesService.findPostLikes(userId);
      return res.status(201).json({ posts });
    } catch (error) {
      console.error(error);
      throw new Error(
        error.message || '400/좋아요 게시글 조회에 실패했습니다.'
      );
    }
  };
}

//---->

module.exports = LikesController;
