const router=require('express').Router();
const userApi = require('./api')
const upload=require('./multer')
const jwt = require('jsonwebtoken')
const imageSchema=require('./schema/imageschema')
const categorySchema=require('./schema/categoryschema')
const decode =require('jwt-decode')


router.post('/commentupload',async (req,res)=>{
        console.log(req.body.singleimagedetail._id);
        comment={
                
                text:req.body.comment,
                id:req.body.loginid,
                imageid:req.body.singleimagedetail._id
        }
        const commentdata=await userApi.commentdata(comment)
        res.send(commentdata)
})

router.post('/displaybycategory',(req,res)=>{
        console.log(req.body.name)
        imageSchema.find({category:req.body.name})
        .then((result)=>{
                res.send(result)
        })
})


router.post('/like',(req,res)=>{
        // console.log(req.body)
        imageSchema.findOne({$and:[{_id:req.body.postid},{likedby:{$in:[req.body.id]}}]})
        .then((data)=>{
                // console.log("data check when like",data)
        if(data!=null){
                imageSchema.updateOne({_id:req.body.postid},{$pull:{likedby:{$in:[req.body.id]}}})
                .then((data)=>{
                        console.log("unlike",data)
                        
                }).catch((err)=>{
                        console.log("unlike error >>>>>>>",err.stack)
                })
        }
        else{
                imageSchema.updateOne({_id:req.body.postid},{$push:{likedby:req.body.id}})
                .then((data)=>{

                        console.log("like",data)
                        
                }).catch((err)=>{
                        console.log("inser>>>>>>>>>>>>>>>>.",err.stack)
                        // res(err)
                })
        }
                
        })
        .catch((err)=>{
                console.log("errrrrorrrr of main like",err.stack)
        })


        imageSchema.findOne({_id:req.body.postid})
        .then((data)=>{
                res.send({likecount:data.likedby.length})
        })
        
})




router.post('/verifytoken',verifyToken,(req,res)=>{
        
        // console.log("token in router>>>>>>>>>>>>",req.headers) 
        jwt.verify(req.token,'monukumar',(err,authData)=>{
                if(err){
                        // console.log("errrrrrrrrrorrrrrrrrrrrr")
                        // console.log(err.stack)
                        res.send(err)
                }
                else{
                        // console.log("Authorized data >>>>>>>>>>>>>>>>>>>>>>>>",authData)
                       console.log("token verified") 
                        res.json({done:true,user:authData.result})
                       
                }

        })
        // let checktoken= userApi.checktoken(req.body)
})

function verifyToken(req,res,next){
       
        const bearerHeader = req.headers['authorization'];
        // console.log("thsi is auth",bearerHeader)

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
     
    req.token = bearerToken;
    next();
  } else {
   
    res.sendStatus(403);
  }
       
}

router.post('/singlepost',(req,res)=>{
        imageSchema.findOne({_id:req.body.id}).then((data)=>{
                // console.log(data)
                res.send(data)
        })
        // console.log("this is id from single post",req.body )

})

router.post('/postload',(req,res)=>{
        // let decoded=decode(req.body)
        // console.log(decoded)
        imageSchema.find({}).then((result)=>{
                // console.log(result)
                res.send(result)
        })
        
})

router.post('/categoryload',(req,res)=>{
        categorySchema.find({}).then((result)=>{        
                res.send(result)
        })
})

router.post('/signup',async (req,res)=>{
        let checkData=await userApi.checkmail(req.body.mail)
        // console.log("checkdata===========>",checkData)          
        let datafromApi = await userApi.adduser(req.body)
        console.log("last output",datafromApi)
        res.send(datafromApi.message)
        // res.send({code:200,message:checkData.data})
});




router.post('/login',async (req,res)=>{
        let checklogin=await userApi.userlogin(req.body.mail,req.body.password)
        // console.log("router result",checklogin)
        // res.send(checklogin.message)
        if(checklogin.message){
                res.send(checklogin.message)
        }
        else{
                console.log("login time data???????>>>>>>>>>>>>>>>>",checklogin)
                let user=decode(checklogin[0]);
                // console.log(user.result)
                res.json({token:checklogin[0],user:user.result})
        }
        

});




router.post('/uploadimage',upload.single("data"),async (req,res)=>{
        // console.log("this is uplaod image router",req.file)
        // console.log("this is upload image token>>>>>>>>>>.",req.file)
        // let token=req.file.token;
        // let decoded=decode(token)
        // console.log("decode token upload image >>>>>>>>>>",decode(req.body.token)) 
        let decoded=decode(req.body.token)
        // console.log("decoded",decoded.result.username)
        req.body.imagename=req.file.originalname;
        req.body.username=decoded.result.username;
        req.body.id=decoded.result._id;
       
        
        const time=new Date();
        req.body.date=time.toLocaleDateString();
        req.body.time=time.toLocaleTimeString();

        let saveimage=await userApi.imagedetail(req.body);
        console.log("data saved=>>>>>",saveimage)
        imageSchema.find({}).then((result)=>{
                // console.log("schema====",result)
                res.send(result)
        })
        // res.send(saveimage)
})


router.post('/uploadcategory',upload.single("data"),async (req,res)=>{
        // console.log(req.file)
        req.body.imagename=req.file.originalname
        // console.log(req.body)
        const categorysave=await userApi.categorysave(req.body);
        // console.log(categorysave)
        // res.send(categorysave)
        categorySchema.find({}).then((result)=>{
                res.send(result)
        })
        
})

module.exports  = router;