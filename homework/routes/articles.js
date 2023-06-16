const express = require("express");
const router = express.Router();
const Articles = require("../schemas/articles");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");
const authMiddlewares = require("../auth_middleware/auth_middleware");


router.get("/",async (req,res)=>{
   // res.send("전체 게시글 조회 페이지");
    const articles_list = await Articles.find({},{title : 1, comment : 1, date : 1}).sort({date: -1});
    res.json({articles_list});
});

router.get("/articles/:user_Id", async (req,res)=>{
    const user = res.locals;
    const{user_Id} = req.params;
    const articles = await Articles.find({NickName : user_Id },{title :1,comment : 1,date : 1});
    const comment = await Comment.find({articles_Nickname: user_Id},{comment:1}).sort({date: -1});
   res.json({articles, comment});
});
router.post("/articles",authMiddlewares, async (req,res)=>{
    const today = new Date();
    const {user} = res.locals;
    console.log({user});
    const {title,comment,password} = req.body;
    await Articles.create({title,comment,password,NickName : user.nickname, date : today});
    
    res.json({success: true});
});

router.put("/articles/:user_Id/modify",authMiddlewares ,async (req,res)=>{
    const {user_Id} = req.params;
    const {password} = req.body;
    const pass = await Articles.findOne({NickName : user_Id});
    
    if(pass['password'] != password)
    {
        return res.status(400).json({success:false, errorMessage: " 비밀번호가 틀렸습니다."});
    }else{
        const {title,comment} = req.body;
        await Articles.updateOne({user_Id,password},{title,comment});
        const articles = await Articles.find({NickName : user_Id});
        res.json({articles})
    }
    
   
});

router.delete("/articles/:user_Id/delete",authMiddlewares,async (req,res)=>{
    const {user_Id} = req.params;
    const {password} = req.body;

    const pass = await Articles.findOne({NickName : user_Id});

    if(pass['password'] != password)
    {
       return res.status(400).json({success:false, errorMessage: " 비밀번호가 틀렸습니다."});
    }else
    {
        await Articles.deleteOne({NickName,password});
        res.json({success:true});
    }
});

module.exports = router;