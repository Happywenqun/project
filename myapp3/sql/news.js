const staffInfos=require("./order.js");
staffInfos.insertMany({

    username:"张三",
    age:22,
    salary:2000,
    year:3,
    sex:"男"

},(err,data)=>{
    console.log(data)
})