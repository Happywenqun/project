var express = require('express');
var router = express.Router();
var uuid = require("node-uuid");

const staffInfos=require("../sql/order.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  staffInfos.find({},(err,data)=>{

    res.render('order', {
      index:3,
      data:data
    });

  })
  
});


// 添加员工

router.get("/add", function (req, res, next) {
  res.render("orderAdd", {
    index: 3,
  });
});
console.log(111);
router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;

  obj.year = obj.year-0;
  obj.salary = obj.salary - 0;
  console.log(obj);

  staffInfos.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/order");
  })
   
});

module.exports = router;

// 删除

router.get("/delete", function (req, res, next) {
  
  //get来的数据在req.query.id
  // const id = req.query.id;

  //在页面点击删除，在cmd查看
  console.log('我现在进入/delete里面了')
  // { _id: '5ff6ff4b9cc0fb1cf8e93651' }
  //query将get传参，转换成对象
  console.log(req.query)

  // production：将代码导入到云数据库了
  // 用id值，删除单条
  staffInfos.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     
    // 页面渲染，找views/admin.ejs，渲染到页面
     res.redirect("/order");
  })
  

});


// 修改

router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);


  staffInfos.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    //render 渲染页面 views/adminUpdate.ejs
    res.render('orderUpdate',{
      index:3,
      data:data
    })
  })

 
});



// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
   /*******不转换都是字符串****/
  //调用方法转数字
  obj.year = Number(obj.year);
  //隐形转换
  obj.salary = obj.salary - 0;

  console.log('obj_id',obj)
  staffInfos.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/order");

  })

  
});


// 搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  staffInfos.find({username:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("order", {
       index: 3,
       data,
    });
  })

 
});

