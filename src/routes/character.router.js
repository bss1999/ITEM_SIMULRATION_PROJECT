import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

//[필수] 캐릭터 생성 - 구현완료
router.post('/character/create',authMiddleware ,async (req, res, next) => {
  try{
    const { name } = req.body;
    const { userId } = req.user;
    const isExistcharacter = await prisma.character.findFirst({ where: { name } });

    if (isExistcharacter) // 캐릭터가 이미 있다면
      return res.status(409).json({ message: '이미 누군가가 사용하고있는 이름입니다.' });

      const character = await prisma.character.create({
        data: {
          userId: +userId,
          name,
          health: 500,
          power: 100,
          money: 10000,
        }
      });
  
      return res.status(201).json({ message: '캐릭터 생성 완료!'});
  } catch (error) {
    next(error);
  }
  });

//[필수] 캐릭터 삭제 - 초안완성
router.delete('/character/delete/:characterId',authMiddleware, async (req, res, next) => {
  try{
    const { userId } = req.user;
    const { characterId } = req.params;

    const select_user = await prisma.character.findFirst({ where: { characterId: +characterId } });
    const login_user = await prisma.character.findFirst({ where: { userId: +userId } });


    if(select_user.userId !== login_user.userId) 
      return  res.status(401).json({ message: '현재 계정의 캐릭터가 아닙니다!' });
  
    const Character = await prisma.character.findUnique({
      where: { characterId: +characterId 
      } 
    });
  
    if (!Character)
      return res.status(404).json({ message: '캐릭터가 존재하지 않습니다.' });
  

    await prisma.character.delete({ where: { characterId: +characterId } });
  
    return res.status(200).json({ message: '캐릭터가 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
  });

  //[필수] 캐릭터 상세조회
  router.get('/character/:characterId',authMiddleware , async (req, res, next) => {
    try{
      const { userId } = req.user;
      const { characterId } = req.params
      let res_view = {}

      const select_user = await prisma.character.findFirst({ where: { characterId: +characterId } });
      const login_user = await prisma.character.findFirst({ where: { userId: +userId } });


      if(!select_user) {
        return res.status(404).json({ message: '해당 캐릭터가 존재하지 않습니다.' });
      }
    
//내계정의 캐릭터인지 아닌지 판별하는 변수 필요
if(select_user.userId !== login_user.userId) {
const user = await prisma.character.findUnique({
    where: { characterId: +characterId },
    select: {
      name: true,
      health: true,
      power: true
    }
  });
  res_view = user
}
else {
  const user = await prisma.character.findUnique({
    where: { characterId: +characterId },
    select: {
      name: true,
      health: true,
      power: true,
      money: true
    }
  });
  res_view = user
}


return res.status(200).json({ data: res_view });
    } catch (error) {
      next(error);
    }
    
  });

  //(테스트) 캐릭터 목록 조회
  router.get('/character/list', async (req, res, next) => {
    try{
      const user = await prisma.character.findMany({
    });


      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  });

  export default router;