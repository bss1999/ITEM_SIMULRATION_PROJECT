export default function (err, req, res, next) {
    console.error(err);
  
    res.status(500).json({ errorMessage: '에러가 발생했습니다.' });
  }