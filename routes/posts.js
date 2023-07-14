const PostsController = require("../controller/posts.controller");
const auth = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

const postsController = new PostsController();

router.get("/", postsController.getAllPosts);
router.get("/:postId", postsController.getPost);
router.post("/", auth, postsController.createPost);
router.put("/:postId", auth, postsController.updatePost);
router.delete("/:postId", auth, postsController.deletePost);

module.exports = router;