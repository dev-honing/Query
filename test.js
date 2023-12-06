// test.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 루트 경로에 대한 요청 핸들러
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

// /search 경로에 대한 요청 핸들러
app.get('/search', (req, res) => {
  const inputString = req.query.textBox;
  const modifiedURL = `http://localhost:${port}/search?textBox=${inputString}`;
  res.send(`검색어: ${inputString}`);
  console.log(`사용자가 이동한 URL: ${modifiedURL}`);
  console.log(`검색어: ${inputString}`)
});

// 서버를 지정한 포트로 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
