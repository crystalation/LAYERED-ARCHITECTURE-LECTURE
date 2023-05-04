const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();
  putLikes = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

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
      const existsPost = await this.likesService.findOnePost(postId);

      if (existsPost) {
        const createLike = await this.likesService.putLikes(postId, userId);
        await this.likesService.addLike(postId);
        res.status(201).json({ message: '좋아요를 추가했습니다.', createLike });
      }
    } catch (err) {
      res.status(err.statusCode).json({
        errormessage: err.message,
      });
    }
  };

  getLikes = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const posts = await this.likesService.findPostLikes(userId);
      return res.status(201).json({ posts });
    } catch (err) {
      res
        .status(400)
        .json({ errormessage: '좋아요 게시글 조회에 실패했습니다.' });
    }
  };
}

//---->

module.exports = LikesController;
