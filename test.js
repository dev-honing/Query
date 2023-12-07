// test.js

const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/search', async (req, res) => {
  const inputString = req.query.textBox;
  const modifiedURL = `http://localhost:${port}/search?textBox=${inputString}`;
  
  try {
    // txt 파일에 검색어 저장
    await fs.appendFile('searchHistory.txt', `${inputString}\n`);
    console.log('검색어가 파일에 저장되었습니다.');

    // JSON 파일에 데이터 저장
    await saveToJSON({ searchQuery: inputString });

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

// JSON 파일에 데이터를 저장하는 함수
async function saveToJSON(data) {
  const filePath = 'userMsg.json';

  try {
    // 파일을 읽어온 후 기존 데이터에 새로운 데이터 추가
    let existingData = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (readError) {
      // 파일이 존재하지 않을 경우 무시
    }

    existingData.push(data);

    // 파일에 새로운 데이터를 씁니다.
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    console.log('데이터가 JSON 파일에 저장되었습니다.');
  } catch (writeError) {
    console.error('JSON 파일에 데이터를 저장하는 중 오류 발생:', writeError);
    throw writeError;
  }
}

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
