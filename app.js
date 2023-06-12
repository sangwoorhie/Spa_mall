const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods')
const connect = require('./schemas');
connect();

app.use(express.json()); // body에 데이터가 들어왔을때 사용가능하게 해주는 전역 미들웨어
app.use("/api", [goodsRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});










