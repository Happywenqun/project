var express = require("express");
var router = express.Router();

const user = require('../sql/user')

router.get('/',function(req,res,next){
    console.log("进入登录界面了");
    res.render("login")
})




router.post("/in",function(req,res,next){
    console.log('我进入 login  in里面了')
    let userdata=req.body;
    // console.log(userdata);
    user.findOne(userdata,(err,data)=>{
        if(err){
            console.log(err)
        }
        // console.log(data)
        if(data){
            req.session.recordData="yes";
            console.log("登录成功");
            res.redirect('/pro')

        }else{
            res.redirect("/register")
        }
    })
})























module.exports = router;