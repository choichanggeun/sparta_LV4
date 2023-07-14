const PostService = require("../service/posts.service");

class PostController{ 
    postService = new PostService();

    allGetPosts = async (req,res) => {
        try{
            const{ code , result } = await this.postService.allGetPosts();
            
            res. status(code).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("에러가 출력 됐습니다.")
        }
    };

    createPost = async (req, res) => {
        try{
            const {writer , password , title , content } = req.body;
            const{ userId } = res.locals.user;

            const{code, post , result} = await this.postService.createPost(
                writer,
                password,
                title,
                content,
                userId
            );
            res.status(code).json({post , result});
        }catch (error) {
            console.log(error)
            res.status(500).send("에러가 발생하였습니다.")
        }
    }

}