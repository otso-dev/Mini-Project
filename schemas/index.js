const monogoose = require("mongoose");
const connect = () =>{
monogoose.connect("mongodb://127.0.0.1:27017/homework").catch((err)=>{
    console.error(err);
   });
};

module.exports = connect;