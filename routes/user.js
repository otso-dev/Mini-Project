const express = require("express");
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const limit_User = require("../schemas/limit_users");
const router = express.Router();

router.post("/users",async(req,res)=>{
    const {nickname,password,confirmPassword} = req.body;
    const limit = limit_User(nickname);

    if(req.headers.authorization.split(' ')[1])
    {
        res.status(401).send({
            errorMessage: "이미 로그인이 되어 있습니다.",
        });
        return;
    }

    try {
        await limit.validateAsync({nickname,password,confirmPassword});
        const existUsers = await User.find({nickname})
        if(existUsers.length)
        {
            res.status(400).send({
                errorMessage : '이미 가입된 닉네임이 있습니다.'
            });
            return;
        }
        const user = new User({nickname, password});
        await user.save();
        res.status(201).send({Message : '회원가입 완료'});
    } catch (error) {
        res.status(401).send({errorMessage: "닉네임과 비밀번호의 규칙을 어겼습니다.",error

    })
    return;
    }
  
    
});

router.post("/auth",async(req,res)=>{
    const {nickname, password} = req.body;
    const user = await User.findOne({nickname,password});
    if(req.headers.authorization.split(' ')[1])
    {
        res.status(401).send({
            errorMessage: "이미 로그인이 되어 있습니다.",
        });
        return;
    }

    if(!user){
        res.status(401).send({
            errorMessage : '닉네임 또는 비밀번호가 잘못됐습니다.',
        })
        return;
    }
    const token = jwt.sign({userId : user.user_Id},"is-my-jsh-key");
    res.send({
        token,
    })
})
module.exports = router;