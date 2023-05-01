const PostRepository = require('../repositories/posts.repository');
//실제로 db를 끌어다 쓰기때문에 repository를 호출한다.

//findAll, create 두가지 메서드를 사용
class PostService {
  postRepository = new PostRepository();

  //저장된 게시글들을 모두 가져오라
  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 map을 통해서 가공 후 controller에게 보여줄 데이터
    //map을 통해 나온 결과 값은 배열 형태로 나간다, 그래서 아래와 같이 객체를 지정해줌
    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  createPost = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.null,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };
}

module.exports = PostService;
