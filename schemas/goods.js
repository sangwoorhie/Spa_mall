const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number, // 숫자타입
    required: true, // 이 값(goodsId)이 무조건 있어야 한다
    unique: true // 해당값(goodsId)이 무조건 고유한값이어야함. 동일한게 존재하지 않는다
  },
  name: {
    type: String,
    required: true, // name이 반드시 있어야 한다.
    unique: true
  },
  thumbnailUrl: {
    type:String,   
  },
  category: {
    type:String,
  },
  price: {
    type:Number,
  }
});

module.exports = mongoose.model("Goods", goodsSchema); 
//콜렉션 이름 : "Goods", goodsSchema는 콜렉션에 들어갈, 위에 변수로 선언된 값


