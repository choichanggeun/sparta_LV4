const PostService = require('../service/posts.service');

class PostsController {
    constructor() {
        this.postService = new PostService();
    }
    
    getAllPosts = async (req, res) => {
        const allPosts = await this.postService.allGetPosts();
        if (!allPosts.length) {
            return res.status(404).json({ errorMessage: '작성된 게시글이 없습니다.' });
        }
        return res.status(200).json({ allPosts });
    };

    getPost = async (req, res) => {
        const { postId } = req.params;
        const result = await this.postService.getPost(postId);
        if(result.errorMessage) {
            return res.status(404).json({ errorMessage: result.errorMessage });
        }
        return res.status(200).json({ post: result.post });
    };

    createPost = async (req, res) => {
        const { userId } = res.locals.user;
        const { title, content, writer, password } = req.body;
        const result = await this.postService.createPost(
            writer,
            password,
            title,
            content,
            userId,
        );
        return res.status(201).json({ post });
    };

    updatePost = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { password, title, content } = req.body;
        const result = await this.postService.updatePost(
            userId,
            postId,
            password,
            title,
            content,
        );
        if(result.errorMessage) {
            return res.status(404).json({ errorMessage: result.errorMessage });
        }
        return res.status(200).json({ message: result.message });
    };

    deletePost = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const result = await this.postService.deletePost(userId, postId);
        if(result.errorMessage) {
            return res.status(404).json({ errorMessage: result.errorMessage });
        }
        return res.status(200).json({ message: result.message });
    };
}

module.exports = PostsController;