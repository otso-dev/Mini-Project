const monogoose = require("mongoose");
const connect = () =>{
monogoose.connect("mongodb://localhost:27017/homework").catch((err)=>{
    console.error(err);
   });
};

module.exports = connect;