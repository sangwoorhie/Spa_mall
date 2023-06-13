const express = require("express");
const router = express.Router();

// /routes.goods.js
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];

//상품 목록조회 API (GET)
  router.get("/goods", (req,res) => {
    res.json({goods : goods}) // key값인 goods는 임의지정, value값인 goods는 위에 선언된 변수 (다양한 상품목록이 할당된 변수)
  });

  // app.js에서 /api가 goodsRouter전달 -> routes/의 goods.js에서 /goods"
  // -> localhost:3000/api/goods
  

//../는 상위폴더로 가는것. schemas/carts.js의 정보를 갖고와야함 
  const Cart = require("../schemas/carts.js");

// 상품 상세조회 API (GET)
// params로 전달받았으므로 req.params로 데이터 갖고옴
  router.get("/goods/:goodsId", (req,res) => {
    const {goodsId} = req.params; // (goodsId는 param임)
    const [detail] = goods.filter((goods) => Number(goodsId) === goods.goodsId)
    res.json({detail});
  });


  // 상품 장바구니 등록 API (POST)
  router.post("/goods/:goodsId/carts", async(req, res) => {
    const {goodsId} = req.params; //구조분해할당 req.params안에 있는 goodsId를 가져온다 (goodsId는 param임)
    const {quantity} = req.body; //구조분해할당 quantity를 body에 받는 이유는 POST매서드를 쓰기 때문에 body안에 quantity를 입력했을때 정상적으로 수신받게 함
  
    const existsCarts = await Cart.find({goodsId}) //대문자 Cart는 const Cart = require("../schemas/carts.js");에서 선언된 Cart
    if (existsCarts.length){
      return res.status(400).json({
        success: false,
        errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다."
        // 위 filter문에서 Number(goodsId) === goods.goodsId로 아이디가 동일한지 검사하고,
        // 데이터의 길이가 존재할때에는(existsCarts.length)즉 동일한 아이디값이 있을경우에는 에러메시지
      });
    };
 
    await Cart.create({goodsId, quantity}); //key-value pair 
    //위에 if문에 해당하지 않을 경우 상품 생성.
  
    res.json({result: "success"});
  });


  // 상품 장바구니 수정 API (PUT)
  // localhost:3000/api/goods/99/cart 이런식, 여기서 99는 goodsId
router.put("/goods/:goodsId/carts", async(req,res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.updateOne(
      {goodsId: goodsId},
      {$set: {quantity: quantity}}
      )
  }
  res.status(200).json({success:true})
})

// 수정할때에는 장바구니에 해당하는 상품이 존재하던, 존재하지 않던 true로 반환.
// 장바구니에 해당값이 없더라도 에러발생 X
// goodsId: goodsId 여기서 왼쪽goodsId는 그냥 key값, 오른쪽 goodsId는 변경후상품
// 수정할 데이터를 중괄호 $set에 넣음. quantity: quantity 여기서 왼쪽 quantity는 "수량"의 key값 오른쪽 quantity는 변경후수량
// 즉 오른쪽의 goodsId와 quantity는 위에 const로 선언된 값들을 나타낸다


// 상품제거 DELETE API
router.delete("/goods/:goodsId/carts", async (req,res) => {
  const {goodsId} = req.params;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.deleteOne({goodsId});
  }

  res.json({result:"success"});
})
// 삭제하고자 찾는 상품의 길이가 1개이상일때, 즉 검출이 되었을때 삭제 실행되도록 함
// 상품이 지워지던, 지워지지 않던 result는 항상 success로 나옴


//../는 상위폴더로 가는것. schemas/goods.js의 정보를 갖고와야함 
// goods.js가 있는 routes폴더에서 메인폴더로 가서 다시 schemas폴더로 가서 goods.js파일로 가야 함
const Goods = require("../schemas/goods.js");


// 상품 생성 API (POST) 동기적 처리를 위해 async/await 사용
// request안에있는 body로 전달받았으므로 req.body로 데이터 갖고옴
router.post("/goods/", async (req, res) => {
  const {goodsId, name, thumbnailUrl, category, price} = req.body; // 객제구조분해할당, key에 맞는 value값을 넣음
console.log("String");

// 오류제거
// 대문자 Goods는 const Goods = require("../schemas/goods.js"); 에서 가져온 값
  const goods = await Goods.find({goodsId}); //goodsId는 고유한값이므로 1개만 존재해야함. 동일한값이 여러개나오면 에러발생. 따라서 동일한값나올경우 대비 if문 사용
  if(goods.length){
    return res.status(400).json({ //에러발생시 400
      success: false,
      errorMessage:"이미 존재하는 GoodsId입니다."
    });
  };

  // 데이터생성
  // 대문자 Goods는 60번째줄 schemas/goods.js에서 가져온 값
  const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});

  res.json({goods: createdGoods})
});

module.exports = router;


// async, await을 통한 동기적 처리
// api서버에서 MongoDB에 접근해서 첫번째로 데이터가 존재하는지 확인, 두번째로 존재하는값이 있었을 때는 반환이 되도록 함 
// 이렇게 첫번째 두번째 순서에 맞게 동기적으로 처리가 되어야 함
// goods.length => goods의 배열 안에 데이터가 오게 함. goods.length가 0이 아닌이상 데이터에 들어옴.







