const monogoose = require("mongoose");
const connect = () =>{
monogoose.connect("mongodb://0.0.0.0:27017/homework").catch((err)=>{
    console.error(err);
   });
};

module.exports = connect;