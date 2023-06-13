const express = require("express");
const router = express.Router();

const Cart = require("../schemas/carts.js"); // schemas폴더에있는 carts.js파일 갖고와야함
const Goods = require("../schemas/goods.js"); // schemas폴더에있는 goods.js파일 갖고와야함


// GET 매서드 조회하기
// localhost:3000/api/carts를 GET매서드로 호출할 때 
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({}); // Cart안에있는 모든데이터를 가져와서 조회한다
  // [
  //     {goodsId, quantity}
  //     {goodsId, quantity} //carts는 return값이 배열형태이다. 배열안에있는 매서드 map를 이용한 반복문을 돌림
  //      ....
  // ];

  const goodsIds = carts.map((cart) => {
    return cart.goodsId // cart안에있는 goodsId만 추출. [2, 11, 19] 이런식으로 goodsId를 배열형식으로 추출
  });

  // [2, 11, 19]

  const goods = await Goods.find({goodsId: goodsIds}); // goodsId에 해당하는 값이 goodsIds 리스트안에 있으면 전부다 가져와라.
 // Goods에 해당하는 모든 정보를 갖고올건데,
 // 만약 goodsIds 변수 안에 존재하는 값일 때에만 조회해라
 // [2, 11, 19]에 해당하는 goodsId일때에만 변수 goods에 할당해라
 // 여기서 쓰인 find는 mongoose에서 쓰인 find


  const results = carts.map((cart) => { //quantity는 carts에 담겨있다.
    return {
        quantity: cart.quantity, // 11번째줄 carts안에 있는 quantity
        goods: goods.find((item) => item.goodsId === carts.goodsId), 
    }
    // item에 해당하는 goodsId와 carts에 해당하는 goodsId가 일치할 경우에만 결과값을 리턴해라
    // 여기서 쓰인 find는 배열에서 하나 찾는 find함수
}) 
// 1. 장바구니 모든 데이터 찾는다
// 2. 장바구니의 모든 상품에 대한 Id를 찾는다
// 3. 상품 Id를 통해 상세 정보를 갖고온다
// 4. 상세정보와 첫번째로 조회한 장바구니에 두가지정보 (queantity, goods)를 가져와서 


res.json ({
    "carts": results,

})

});

module.exports = router;


// 아래처럼 되야 함
// {
// 	"carts": [
// 		{
// 			"quantity": 10,
// 			"goods": {
// 		    "goodsId": 3,
// 		    "name": "시원한 콜라3333",
// 		    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7JqMw7ZYZP4ZW136wcoMTmLzbrMIJzUWb1Dhu9cHwCPp0gA&usqp=CAc",
// 		    "category": "drink",
// 		    "price": 3000
// 		  }
// 		},
// 		{
// 			"quantity": 3,
// 			"goods": {
// 		    "goodsId": 1,
// 		    "name": "시원한 콜라1",
// 		    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7JqMw7ZYZP4ZW136wcoMTmLzbrMIJzUWb1Dhu9cHwCPp0gA&usqp=CAc",
// 		    "category": "drink",
// 		    "price": 3000
// 		  }
// 		}
// 	]
// }