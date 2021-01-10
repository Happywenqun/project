var express = require("express");
var router = express.Router();
const user = require('../sql/user');

router.get('/',function(req,res,next){
    console.log("进入注册页面");
    res.render("register")
});
router.post("/in",function(req,res,next){
    console.log("进入in里面了")
    let userInfo=req.body;
    console.log(userInfo)

    user.findOne({username:userInfo.username},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log("数据库已有")
            res.redirect("/register")
        }
        
        else{
            user.insertMany(userInfo,(err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log("数据库未有")
                console.log(data)

                res.redirect("/login")
            })
        }
    })


})



















module.exports = router;
