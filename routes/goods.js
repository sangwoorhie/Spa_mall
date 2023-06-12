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

//상품 목록조회 API
  router.get("/goods", (req,res) => {
    res.json({goods : goods}) // key값인 goods는 임의지정, value값인 goods는 위에 선언된 변수 (다양한 상품목록이 할당된 변수)
  });

//상품 상세조회 API
  router.get("/goods/:goodsId", (req,res) => {
    const {goodsId} = req.params; 
    const [detail] = goods.filter((goods) => Number(goodsId) === goods.goodsId)
    res.json({detail});
  });


const Goods = require("../schemas/goods.js"); // ../는 상위폴더로 가는것. goods.js가 있는 routes폴더에서 메인폴더로 가서 다시 schemas폴더로 가서 goods.js파일로 가야 함

router.post("/goods/", async (req, res) => {
  const {goodsId, name, thumbnailUrl, category, price} = req.body; // 객제구조분해할당, key에 맞는 value값을 넣음

  const goods = await Goods.find({goodsId}); //goodsId는 고유한값이므로 1개만 존재해야함. 동일한값이 여러개나오면 에러발생. 따라서 if문 사용
  if(goods.length){
    return res.status(400).json({
      success: false,
      errorMessage:"이미 존재하는 GoodsId입니다."
    });
  };

  const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});

  res.json({goods: createdGoods})
});

module.exports = router;


// async, await을 통한 동기적 처리
// api서버에서 MongoDB에 접근해서 첫번째로 데이터가 존재하는지 확인, 두번째로 존재하는값이 있었을 때는 반환이 되도록 함 
// 이렇게 첫번째 두번째 순서에 맞게 동기적으로 처리가 되어야 함
// goods.length => goods의 배열 안에 데이터가 오게 함. goods.length가 0이 아닌이상 데이터에 들어옴.







