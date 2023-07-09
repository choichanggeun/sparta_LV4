const express = require('express');
const router = express.Router();
const { Users , Posts, Likes } = require('../models');
const { Op } = require('sequelize');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

// 게시글 좋아요
router.put('/:postId/like', auth, async (req, res) => {
  const postId = req.params.postId;
  const { userId } = res.locals.user;
  
    const post = await Posts.findOne({ where: { postId: postId } });
  
    const mylike = await Likes.findOne({
      where: {
        [Op.and]: [{ Post_Id: postId }, { User_Id: userId }],
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        errorMessage: '해당 게시글을 찾을 수 없습니다.',
      });
    } else if (!mylike) {
      await Posts.update({ like: post.like + 1 }, { where: { postId: post.postId } });
  
      await Likes.create({
        Post_Id: postId,
        User_Id: userId,
      });
      return res.status(200).json({ message: '게시글에 좋아요를 눌렀습니다.' });
    } else if (mylike) {
      await Posts.update({ like: post.like - 1 }, { where: { postId: post.postId } });
  
      await Likes.destroy({
        where: {
          [Op.and]: [{ Post_Id: postId }, { User_Id: userId }],
        },
      });
  
      return res.status(400).json({
        errorMessage: '좋아요가 취소되었습니다.',
      });
    }
  });
  
  // 좋아요 게시글 조회
  router.get('/like', auth, async (req, res) => {
    const { userId } = res.locals.user;
  
    const posts = await Likes.findAll({
      where: { User_Id: userId },
      include: [
        {
          model: Posts,
          include: [
            {
              model: Users,
              attributes: ['nickname'],
            },
          ],
        },
      ],
      order: [[Posts, 'like', 'DESC']],
      attributes: [],
    });
  
    return res.status(200).json({ posts });
  });
  
  module.exports = router;