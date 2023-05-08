const PostsRepository = require('../repositories/posts.repository');

//실제로 db를 끌어다 쓰기때문에 repository를 호출한다.

//findAll, create 두가지 메서드를 사용
class PostsService {
  postsRepository = new PostsRepository();

  //게시글작성 함수
  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postsRepository.createPost(
      userId,
      title,
      content
    );
    return createPostData;
  };

  //게시글 전체 조회 함수
  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postsRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 map을 통해서 가공 후 controller에게 보여줄 데이터

    //map을 통해 나온 결과 값은 배열 형태로 나간다, 그래서 아래와 같이 객체를 지정해줌
    return allPost.map((post) => {
      return {
        postId: post.postId,
        UserId: post.UserId,
        title: post.title,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  //게시글 상세조회
  findPostById = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);

    if (!post) {
      throw new Error('404/게시글이 존재하지 않습니다.');
    }
    return post;
  };

  //게시글 수정
  putPost = async (postId, title, content) => {
    const post = await this.postsRepository.putPost(postId, title, content);
    return post;
  };

  //게시글 삭제
  deletePost = async (postId) => {
    await this.postsRepository.deletePost(postId);

    return;
  };
}

module.exports = PostsService;
