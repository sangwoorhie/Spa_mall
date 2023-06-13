const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number, // 숫자타입
    required: true, // 이 값이 무조건 있어야 한다
    unique: true // 해당값이 무2조건 고유한값이어야함. 동일한게 존재하지 않는다
  },
  quantity: {
    type: Number,
    required: true, // 장바구니 개수는 무조건 존재해야한다
  }
});

module.exports = mongoose.model("Cart", cartSchema); 
//콜렉션 이름 : "Goods", goodsSchema는 콜렉션에 들어갈 값


