var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage=require('node-localstorage').LocalStorage;
// var LocalStorage=x.LocalStorage
localStorage=new LocalStorage('./scratch')
date=new Date()

router.get('/adminlogin',function(req,res,next){
  res.render("adminlogin",{message:''})
})

router.get('/adminlogout',function(req,res,next){
  localStorage.clear()
  res.render("adminlogin",{message:''})
})

router.post('/chkadminlogin',function(req,res,next){  
  pool.query("select * from administrator where emailid=? and password=?", [req.body.emailid, req.body.password], function(error,result){
    if(error){
      console.log(error)
      res.render("adminlogin",{message:'server error...'})
    }
    else{
      if(result.length==1){
        localStorage.setItem("ADMIN",JSON.stringify(result[0]))
        res.render("dashboard",{data:result})
      }
      else{
        res.render("adminlogin",{message:'Invalid Emailid / password'})
      }
    }
  })
})

module.exports=router