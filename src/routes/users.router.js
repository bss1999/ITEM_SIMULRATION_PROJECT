import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// [필수] 계정 회원가입 API - 구현완료
router.post('/sign-up', async (req, res, next) => {
  try{
    const { id, password, re_password, name } = req.body;

    const id_split = id.split('')
    for(let i=0; i<id_split.length; i++) {
      for(let j=65; j<=90; j++) {
          if(id_split[i] === String.fromCharCode(j)) {
            return res.status(400).json({ message: '아이디에 대문자가 존재합니다. 아이디는 영어 소문자 + 숫자 조합으로 구성되어야합니다.' });
          }
      }
    }

    const isExistId = await prisma.users.findFirst({ //아이디 중복여부 확인
      where: {
        id, //해당 아이디로 조회했을때
      },
    });

    if (isExistId) { //아이디가 존재한다면 오류문 출력
      return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
    }



    if (password.split('').length<6) {
      return res.status(400).json({ message: '비밀번호가 너무 짧습니다! 6자 이상으로 설정해주시길 바랍니다.' });
    }

    if (password !== re_password) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다! 비밀번호가 맞는지 확인해주세요.' });
    }
  
    // 사용자 비밀번호를 암호화(해싱)하여 저장
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Users 테이블에 사용자를 추가합니다.
    const user = await prisma.users.create({
      data: {
        id,
        password: hashedPassword, // 암호화된 비밀번호를 저장합니다.
        name
      },
    });

    const res_user = {
      id,
      name
    }
  
  
    return res.status(201).json({ data: res_user });
  } catch (error) {
    next(error);
  }
  });
  


  // [필수] 로그인 API - 구현완료
router.post('/sign-in', async (req, res, next) => {

  try{
    const { id, password } = req.body;
    const user = await prisma.users.findFirst({ where: { id } });
  
    if (!user) // 계정이 없다면
      return res.status(404).json({ message: '존재하지 않는 계정입니다.' });
    // 계정은 있지만 비밀번호가 일치하지 않는다면
    else if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
  
    // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      'custom-secret-key',
    );
  
    // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
    // 유저비밀번호가 일치하여 로그인에 성공한다면 JWT(아이디 카드)를 발급
    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({ message: '로그인 성공!' });
  } catch (error) {
    next(error);
  }
  });

  export default router;