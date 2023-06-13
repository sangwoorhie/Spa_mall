const mongoose = require("mongoose");

const connect = () => { //화살표 익명함수. app.js에서 실행시킴(connect();) 
    mongoose 
        .connect("mongodb://127.0.0.1:27017/spa_mall") // mongodb연결
        .catch(err => console.log(err)); // catch 에러발생시. err이라는 변수에 담음
};

mongoose.connection.on("error", err => { // err 변수 받아와서 에러메시지
    console.error("몽고디비 연결 에러", err);
});

mongoose.connection.on("connected", () => {
   console.log("db연결완료")
});
module.exports = connect; // 화살표 익명함수가 밖으로 내보내짐. app.js의 const connect으로 감

// 27017
// "mongodb://localhost:27017/test"