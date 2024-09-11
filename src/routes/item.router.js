import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//[필수] 아이템 생성 API - 구현완료
router.post('/item/create', async (req, res, next) => {
  try {
    const { itemId, name, stat, price } = req.body; 

  const isExistItem = await prisma.item.findFirst({ //아이템 중복여부 확인
    where: {
        //아이템 이름을 필터해서
        name,
    },
  });

  if (isExistItem) { //아이템 이름이 이미 존재한다면 오류문 출력
    return res.status(409).json({ message: '이미 존재하는 아이템 이름입니다.' });
  }

  const createitem = await prisma.Item.create({
    data: {
      itemId: +itemId,
      name,
      stat,
      price
    },
  });

  return res.status(201).json({ message: '아이템이 생성되었습니다.' });
  }
  catch (error) {
    next(error);
  }
    });


//[필수] 아이템 수정 API - 구현완료
router.put('/item/update/:itemId', async (req, res, next) => {
  try{
    const { name, stat } = req.body;
    const { itemId } = req.params

    const isExistItem = await prisma.item.findUnique({ 
      where: { itemId: +itemId },
    });
  
    if (!isExistItem) 
      return res.status(404).json({ message: '없는 아이템 입니다.' });

    const fixitem = await prisma.item.update({
      data: {
        name: name,
        stat: stat
      },
      where: {
        itemId: +itemId
    }
  });

    return res.status(200).json({ message: '아이템이 수정되었습니다.'});
  } catch (error) {
    next(error);
  }
});

//[필수] 아이템 목록 조회 - 구현완료
router.get('/item/list', async (req, res, next) => {
  try{
    const item_list = await prisma.item.findMany({
      select: {
          itemId: true,
          name: true,
          price: true,
        }
  });

  return res.status(200).json({ data: item_list });
  } catch(error) {
    next(error);
  }
    });

//[필수] 아이템 상세 조회 - 구현완료
router.get('/item/:itemId', async (req, res, next) => {
  try{ 
    const { itemId } = req.params

    const item = await prisma.item.findUnique({
        where: {
            itemId: +itemId
          },
        select: {
            itemId: true,
            name: true,
            stat: true,
            price: true
          }
    });

    if(!item) {
      return res.status(404).json({ message: '해당 아이템이 존재하지 않습니다.' });
    }

    return res.status(200).json({ data: item });
  }
  catch (error) {
    next(error);
  }
    });


    export default router;