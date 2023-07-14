const { Posts,Users} = require('../models');

class PostRepository {
     async allGetPosts () {
    return await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });
  };

  createPost = async (writer, password, title, content, userId) => {
    return await Posts.create({
      UserId: userId,
      writer,
      password,
      title,
      content,
    });
  };

  getPost = async (postId) => {
    return await Posts.findOne({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { postId: postId },
    });
  };

  updatePost = async (postId, title, content) => {
    return await Posts.update(
      {
        title: title,
        content: content,
      },
      {
        where: { postId: postId },
      },
    );
  };

  deletePost = async (postId) => {
    return await Posts.destroy({ where: { postId: postId } });
  };
}

module.exports = PostRepository;