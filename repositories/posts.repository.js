const { Posts } = require('../models');

class PostsRepository {
  createPost = async (userId, title, content) => {
    // console.log(userId);
    // console.log(title);
    // console.log(content);
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    console.log(createPostData);
    return createPostData;
  };

  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    return post;
  };
}

module.exports = PostsRepository;
