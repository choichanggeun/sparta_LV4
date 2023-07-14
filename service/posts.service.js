const PostRepository = require('../repo/post.repo');

class PostService{
    postRepository = new PostRepository();

    allGetPosts = async () => {
        const result = await this.postRepository.allGetPosts();
        return result;
    };

    createPost = async () => {
        const post = await this.postRepository.createPost(
            writer,
            password,
            title,
            content,
            userId
        );
            return {post , result:"게시글 작성이 완료 됐습니다."}
    };

    getPost = async (postId) => {
        const result = await this.postRepository.getPost(postId);
        if(!result){
            return { result: "존재하지 않는 게시글입니다." };
        }else{
            return {result};
        }
    };
    updatePost = async (userId , postId , password, title , content) => {
        const post = await this.postRepository.getPost(postId);
        if(!post) {
            return {result :"존재하지 않는 게시글입니다."};

        }else if  (post.userId !== userId) {
            return {result: "게시글 작성자가 아닙니다."};

        } else if (post.password !== password) {
            return {result : "비밀번호가 일치하지 않습니다."}
        } else if (!content) {
            return {result: "내용을 입력해주세요"};
        }else {
            const result = await this.postRepository.updatePost(
                postId,
                title,
                content
            );
                return {result};
        }
        
    };

    deletePost = async (userId, postId) => {
        const post = await this.postRepository.getPost(postId);
        if (!post) {
          return {result: "존재하지 않는 게시글입니다."};
        } else {
          if (userId !== post.userId) {
            return {result: "게시글 작성자가 아닙니다."};
          } else {
            const result = await this.postRepository.deletePost(postId);
            return {result: "게시글 삭제가 완료되었습니다."};
          }
        }
    
    };
 };

module.exports = PostService;


    
