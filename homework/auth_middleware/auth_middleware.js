const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
module.exports = (req,res,next)=>{
    const {authorization} = req.headers//클라에서 헤더에서 보낸 토큰을 받아 읽는다.
    const [tokenType, tokenValue] = authorization.split(' ');
    if(tokenType !== 'Bearer'){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }
    try {
        const {userId} = jwt.verify(tokenValue, "is-my-jsh-key");
        User.findById(userId).exec().then((user)=>{
            res.locals.user = user;
            next();
        });
       
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }
};