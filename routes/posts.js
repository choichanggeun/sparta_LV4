const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

const { Posts,Users } = require('../models');


// 전체 게시글 조회
router.get('/', async (req, res) => {
  const allPosts = await Posts.findAll({
    include: [
      {
        model: Users,
        attributes: ['nickname'],
      },
    ],
  });

  if (!allPosts.length) {
    return res.status(404).json({
      errorMessage: '작성된 게시글이 없습니다.',
    });
  }
  return res.status(200).json({ allPosts });
});

// postId 값을 가진 게시글 조회
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await Posts.findOne({
    include: [
      {
        model: Users,
        attributes: ['nickname'],
      },
    ],
    where: { postId: postId },
  });

  if (!post) {
    return res.status(404).json({
      errorMessage: '해당 게시글을 찾을 수 없습니다..',
    });
  }
  return res.status(200).json({ post });
});

// 게시글 생성
router.post('/', auth, async (req, res) => {
  const { userId } = res.locals.user;
  const { title, content, writer,password } = req.body;
  const post = await Posts.create({
    UserId: userId,  
    writer,
    password,
    title,
    content,
  });

  return res.status(201).json({ post });
});

// // 게시글 수정
router.put('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;

  const post = await Posts.findOne({ where: { postId: postId } });

  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: '해당 게시글을 찾을 수 없습니다.',
    });
  } else if (post.UserId !== userId) {
    return res.status(401).json({
      success: false,
      message: '권한이 없습니다.',
    });
  }
  await Posts.update(
    {
      title: title,
      content: content,
    },
    {
      where: { postId: postId },
    },
  );
  return res.status(200).json({
    success: true,
    message: '해당 게시글이 수정되었습니다.',
  });
});

// // 게시글 삭제
router.delete('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  const post = await Posts.findOne({ where: { postId: postId } });

  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: '해당 게시글을 찾을 수 없습니다.',
    });
  } else if (post.UserId !== userId) {
    return res.status(401).json({
      success: false,
      message: '권한이 없습니다.',
    });
  }
  await Posts.destroy({ where: { postId: postId } });
  return res.status(200).json({
    success: true,
    message: '해당 게시글이 삭제되었습니다.',
  });
});

module.exports = router;