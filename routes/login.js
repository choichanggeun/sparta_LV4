const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

// 로그인 API 

router.post('/', async (req, res) => {
    const { nickname, password } = req.body;
    const user = await Users.findOne( {where: { nickname:nickname }})
    if (!user) {
      return res.status(409).json({ errMessage: "가입되지 않은 아이디입니다. 아이디를 확인해주세요." });
    } else if (password !== user.password) {
      return res.status(409).json({ errMessage: "비밀번호를 확인하여 주십시오." });
    }
  
    const token = jwt.sign({
      userId: user.userId
    }, "customized-secret-key");
    res.cookie("Authorization", `Bearer ${token}`);
    return res.json({ message: "로그인 완료" })
  })
  
  module.exports = router;