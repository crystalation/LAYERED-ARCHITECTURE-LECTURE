const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();
  putLikes = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const existsLike = await this.likesService.findLike(postId, userId);
    const existsPost = await this.likesService.findOnePost(postId);

    if (!existsPost) {
      throw new Error('404, 게시글이 존재하지않습니다.');
    }

    try {
      if (existsLike) {
        console.log(existsLike);
        await this.likesService.deleteLikes(postId, userId);
        await this.likesService.dropLike(postId);
        return res.status(201).json({
          message: '좋아요를 취소했습니다.',
        });
      }

      const createLike = await this.likesService.putLikes(postId, userId);
      await this.likesService.addLike(postId);
      res.status(201).json({ message: '좋아요를 추가했습니다.', createLike });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: '게시글 좋아요에 실패하였습니다.' });
    }
  };

  getLikes = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const posts = await this.likesService.findPostLikes(userId);
      return res.status(201).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: '좋아요 게시글 조회에 실패하였습니다.' });
    }
  };
}

//---->

module.exports = LikesController;
