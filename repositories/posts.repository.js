const { Posts } = require('../models');

class PostsRepository {
  //게시글 작성
  createPost = async (userId, title, content) => {
    console.log(userId);
    console.log(title);
    console.log(content);
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    console.log(createPostData);
    return createPostData;
  };

  //게시글 전체조회
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  };

  //게시글 상세 조회
  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    console.log(post);
    return post;
  };

  //게시글 수정
  putPost = async (postId, title, content) => {
    const existsPost = await Posts.findByPk(postId);
    console.log(existsPost);
    existsPost.title = title;
    existsPost.content = content;
    existsPost.updatedAt = new Date();

    await existsPost.save();
    return existsPost;
  };

  //게시글 삭제
  deletePost = async (postId) => {
    const post = await Posts.findByPk(postId);
    await post.destroy();
    return;
  };
}

module.exports = PostsRepository;
