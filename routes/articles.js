const express = require("express");
const articles = require("../schemas/articles");
const router = express.Router();
const Articles = require("../schemas/articles");
const Count = require("../schemas/count");

router.get("/",(req,res)=>{
    res.send("this root page");
});

router.get("/articles",async (req,res)=>{
   // res.send("전체 게시글 조회 페이지");
    const articles_list = await Articles.find({},{title : 1, names : 1, date : 1}).sort({date: -1});
    res.json({articles_list});
   
});

router.get("/articles:Name_Id",async (req,res)=>{
    const{Name_Id} = req.params;
    const articles = await Articles.find({Name_Id : Number(Name_Id)},{title :1,names:1,comment : 1,date : 1});

    res.json({articles});
});

router.post("/articles",async (req,res)=>{
    const today = new Date();
    const {title,names,comment,password} = req.body;
    const count = await Count.find({countstring});
    
    if(!count.length){
        await Count.updateOne({countstring: "count"},{$inc : {count: 1}});
    }else{
        await Count.inserOne({countstring: "count"},{count : 0});
    }
   
    
    const Id = (await Count.find({ countstring: 'count' }))[0].count
    await Articles.create({title,names,comment,today,password,Name_Id : Id, date : today});
    
    res.json({success: true});
});

router.put("/articles:Name_Id/modify",async (req,res)=>{
    const {Name_Id} = req.params;
    const {password} = req.body;
    const pass = await Articles.findOne({Name_Id : Number(Name_Id)});
    
    if(pass['password'] != password)
    {
        return res.status(400).json({success:false, errorMessage: " 비밀번호가 틀렸습니다."});
    }else{
        const {title,names,comment} = req.body;
        await Articles.updateOne({Name_Id,password},{title,names,comment});
        const articles = await Articles.find({Name_Id : Number(Name_Id)});
        res.json({articles})
    }
    
   
});

router.delete("/articles:Name_Id/delete",async (req,res)=>{
    const {Name_Id} = req.params;
    const {password} = req.body;

    const pass = await Articles.findOne({Name_Id : Number(Name_Id)});

    if(pass['password'] != password)
    {
       return res.status(400).json({success:false, errorMessage: " 비밀번호가 틀렸습니다."});
    }else
    {
        await Articles.deleteOne({Name_Id,password});
        res.json({success:true});
    }
});

module.exports = router;