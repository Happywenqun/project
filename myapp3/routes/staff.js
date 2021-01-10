var express = require("express");
var router = express.Router();
// const staffInfos = require("../sql/staff");
console.log("进入staff模块")

router.get("/",function(req,res,next){

    console.log("进入staff模块2222")
    // staffInfos.find({},(err,data)=>{
    //     if(err){
    //         console.log(err)
    //     }

        res.render("u3",{
            // index=3,
            // data:data

            
        },()=>{
            console.log("到底错啊")
        });
    });
// });
module.exports = router;