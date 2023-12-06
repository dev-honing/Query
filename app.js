// app.js

const express = require('express');
const app = express();
const port = 3000;

// 정적 파일들을 제공하기 위한 미들웨어
app.use(express.static('public')); 

// 루트 경로에 대한 요청 핸들러
app.get('/', (req, res) => {
  res.send('안녕하세요! Express 서버에 오신 것을 환영합니다.');
});

// 서버를 지정한 포트로 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});