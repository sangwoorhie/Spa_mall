const mongoose = require("mongoose");

const connect = () => { //화살표 익명함수. app.js에서 실행시킴(connect();) 
    mongoose 
        .connect("mongodb://localhost:27017/spa_mall")
        .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect; // app.js의 const connect






