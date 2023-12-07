// test.js

const express = require('express');
const path = require('path');
const fs = require('fs/promises'); // Node.js에서 제공하는 Promise 기반의 파일 시스템 모듈
const app = express();
const port = 3000;

// 루트 경로에 대한 요청 핸들러
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

// /search 경로에 대한 요청 핸들러
app.get('/search', async (req, res) => {
  const inputString = req.query.textBox;
  const modifiedURL = `http://localhost:${port}/search?textBox=${inputString}`;
  
  try {
    // txt 파일에 검색어 저장
    await fs.appendFile('searchHistory.txt', `${inputString}\n`);
    console.log('검색어가 파일에 저장되었습니다.');

    // 응답 보내기(서버 콘솔)
    res.send(`검색어: ${inputString}`);
    console.log(`사용자가 이동한 URL: ${modifiedURL}`);
    console.log(`검색어: ${inputString}`);
  } catch (error) {
    // 에러 처리
    console.error('파일에 검색어를 저장하는 중 오류 발생:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 서버를 지정한 포트로 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
