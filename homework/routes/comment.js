const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddlewares = require("../auth_middleware/auth_middleware");


router.get("/articles/:user_Id/comment",async (req,res)=>{
    const {user_Id} = req.params;
    const comment = await Comment.find({articles_Nickname : user_Id},{comment : 1, date : 1}).sort({date: -1})
    res.send({comment});
});

router.post("/articles/:user_Id/comment", authMiddlewares ,async (req,res) =>{

    const {user_Id} = req.params;
    const {comment} = req.body;
    const today = new Date();
    const {user} = res.locals;
    const comment_id = await Comment.findOne().sort("-comment_id");
    let id = 1;
    if(!comment){
        res.status(400).send({
            errorMessage : "댓글 내용이 비워져 있습니다.",
        });
        return;
    }
    if(comment_id){
        id = comment_id.comment_id + 1;
    }
    await Comment.create({comment,date : today, articles_Nickname : user_Id,
        my_Nickname : user.nickname, comment_id : id
    })
    res.status(201).send({success : "true"});

});

router.patch("/articles/:user_Id/comment/modify", authMiddlewares, async (req,res)=>{
    const {user_Id} = req.params;
    const {comment} = req.body;
    const {user} = res.locals;
    console.log(user.nickname);
    const my_Nickname = await Comment.findOne({my_Nickname : user.nickname});
    console.log(my_Nickname.my_Nickname);
    if(!comment){
        res.status(400).send({errorMessage : "댓글란에 댓글을 입력하세요."});
        return;
    }
    else if(user.nickname != my_Nickname.my_Nickname){
        res.status(400).send({errorMessage : "본인이 쓴 댓글만 수정가능합니다."});
        return;
    }
    await Comment.updateOne({my_Nickname : my_Nickname.my_Nickname}, {$set : {comment : comment}})
    res.send({success : true});

});

router.delete("/articles/:user_Id/comment/delete", authMiddlewares, async (req,res)=>{
    const {user_Id} = req.params;
    const {user} = res.locals;
    const my_Nickname = await Comment.findOne({my_Nickname : user.nickname});
    if(user.nickname !== my_Nickname.my_Nickname){
        res.status(400).send({errorMessage : "본인이 쓴 댓글만 삭제가능합니다."});
        return;
    }
    await Comment.deleteOne({my_Nickname : my_Nickname.my_Nickname});
    res.json({success:true});

});



module.exports = router;