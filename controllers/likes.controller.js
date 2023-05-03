const { urlencoded } = require('express');
const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();
  putLikes = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      const existsLike = await this.likesService.findLike(postId, userId);
      if (existsLike) {
        console.log(existsLike);
        await this.likesService.deleteLikes(postId, userId);
        return res.status(201).json({
          message: '좋아요를 취소했습니다.',
        });
      }

      const createLike = await this.likesService.putLikes(postId, userId);
      res.status(201).json({ message: '좋아요를 추가했습니다.', createLike });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: '게시글 좋아요에 실패하였습니다.' });
    }
  };
}

//---->

module.exports = LikesController;

//이미 좋아요가 추가되어있는지 확인
//   const existsLike = await this.likesService.putLikes(postId, userId);
//   if (existsLike) {
//     await this.likesService.deleteLikes(postId, userId);
//     return res.status(200).json({ message: '좋아요를 취소하였습니다.' });
//   }

//좋아요가 없으면 좋아요를 등록
