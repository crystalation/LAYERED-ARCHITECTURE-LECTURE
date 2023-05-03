const PostsService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postsService = new PostsService(); // Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

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
      res.status(400).json({ errormessage: err });
    }
  };

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postsService.findAllPost();

    res.status(200).json({ data: posts });
  };

  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postsService.findPostById(postId);

    res.status(200).json({ data: post });
  };
}

module.exports = PostsController;
