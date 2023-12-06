// app.js

const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

// 루트 경로에 대한 요청 핸들러
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html')
  res.sendFile(indexPath);
});

// 서버를 지정한 포트로 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});