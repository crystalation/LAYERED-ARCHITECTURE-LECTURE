const PostsService = require('../services/posts.service');
const postSchema = require('../validation/joi-schemas');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postsService = new PostsService(); // Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  //게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      //Joi로 body를 validate
      const validatedBody = await postSchema.createPostSchema.validateAsync(
        req.body
      );

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postsService.createPost(
        userId,
        validatedBody.title,
        validatedBody.content
      );

      res
        .status(201)
        .json({ message: '게시글을 작성하였습니다.', createPostData });
    } catch (error) {
      console.error(error);
      if (error.isJoi) {
        return res
          .status(412)
          .json({ message: '데이터 형식이 올바르지 않습니다.' });
      }
      throw new Error(error.message || '400/게시글작성에 실패했습니다.');
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
    try {
      const { postId } = req.params;
      const post = await this.postsService.findPostById(postId);

      res.status(200).json({ data: post });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/게시글작성에 실패했습니다.');
    }
  };

  //게시글 수정
  putPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const existsPost = await this.postsService.findPostById(postId);
      const validatedBody = await updatePostSchema.validateAsync(req.body);

      // if (!title || !content) {
      //   throw new Error('412/데이터 형식이 올바르지 않습니다.');
      // }

      // if (typeof title !== 'string') {
      //   throw new Error('412/제목 형식이 올바르지 않습니다.');
      // }

      // if (typeof content !== 'string') {
      //   throw new Error('412/게시글 형식이 올바르지 않습니다.');
      // }

      if (userId !== existsPost.UserId) {
        throw new Error('403/게시글의 수정 권한이 존재하지 않습니다.');
      }

      await this.postsService.putPost(
        postId,
        validatedBody.title || existsPost.title,
        validatedBody.content || existsPost.content
      );

      //조건을 다 통과했으면 수정
      const putPost = await this.postsService.putPost(postId, title, content);
      return res
        .status(201)
        .json({ message: '게시글을 수정하였습니다.', putPost });
    } catch (error) {
      //여기서 catch 되는건 service에서 보낸거
      console.error(error);
      if (error.isJoi) {
        return res
          .status(412)
          .json({ message: '데이터 형식이 올바르지 않습니다.' });
      }
      throw new Error(error.message || '400/게시글 수정에 실패했습니다.');
    }
  };

  //게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const existsPost = await this.postsService.findPostById(postId);

      if (userId !== existsPost.UserId) {
        throw new Error('403, 게시글 삭제 권한이 없습니다.');
      }
      await this.postsService.deletePost(postId);
      return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || '400/게시글 수정에 실패했습니다.');
    }
  };
}

module.exports = PostsController;
