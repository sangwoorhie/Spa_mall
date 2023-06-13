const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods.js') // /routes/goods.js에서 Router갖고옴
const cartsRouter = require('./routes/carts.js') // /routes/carts.js에서 Router갖고옴

const connect = require('./schemas'); // index.js에서 module.exports을 통해 가져옴
connect(); // index.js에서 가져온 서버 호출

app.use(express.json()); // body에 데이터가 들어왔을때 사용가능하게 해주는 전역 미들웨어. 
// 이 미들웨어는 반드시 바로아래있는 app.use("/api", [goodsRouter, cartsRouter])보다 위에 쓴다.
app.use("/api", [goodsRouter, cartsRouter]);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});










