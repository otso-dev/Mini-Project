const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 4000;


connect();

const articlesRouter = require("./routes/articles");

const requestMiddleware = (req,res,next) => {
    console.log("Request URL:",req.originalUrl," - ",new Date());
    next();
};


app.use(express.urlencoded({extended : true}));
app.use(requestMiddleware);

app.use(express.json());
app.use("/",articlesRouter);

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(port, ()=>{
    console.log(port,"포트로 서버가 커졌어요!");
});

