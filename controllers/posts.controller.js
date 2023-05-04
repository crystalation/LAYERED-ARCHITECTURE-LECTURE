const { post } = require('../routes');
const PostsService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postsService = new PostsService(); // Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  //게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, content } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postsService.createPost(
        userId,
        title,
        content
      );

      res.status(201).json({ data: createPostData });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errormessage: err });
    }
  };

  //게시글 전체 조회
  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postsService.findAllPost();

    res.status(200).json({ data: posts });
  };

  //게시글 상세 조회
  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postsService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  //게시글 수정
  putPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      const existsPost = await this.postsService.findPostById(postId);

      if (!existsPost) {
        return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      }

      if (!title || !content) {
        return res
          .status(412)
          .json({ message: '데이터 형식이 올바르지 않습니다.' });
      }

      if (typeof title !== 'string') {
        return res
          .status(412)
          .json({ message: '제목 형식이 올바르지 않습니다.' });
      }

      if (typeof content !== 'string') {
        return res
          .status(412)
          .json({ message: '게시글 형식이 올바르지 않습니다.' });
      }

      if (userId !== existsPost.UserId) {
        throw new Error('403, 게시글의 수정 권한이 존재하지 않습니다.');
      }

      const putPost = await this.postsService.putPost(postId, title, content);
      return res
        .status(201)
        .json({ message: '게시글을 수정하였습니다.', putPost });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: '게시글 수정에 실패했습니다.' });
    }
  };

  //게시글 삭제
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const existsPost = await this.postsService.findPostById(postId);

    if (!existsPost) {
      throw new Error('404, 게시글이 존재하지 않습니다.');
    }

    if (userId !== existsPost.UserId) {
      throw new Error('403, 게시글 삭제 권한이 없습니다.');
    }

    try {
      await this.postsService.deletePost(postId);
      return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (error) {
      console.error(error);
      throw new Error('400, 게시글 삭제에 실패하였습니다.');
    }
  };
}

module.exports = PostsController;
