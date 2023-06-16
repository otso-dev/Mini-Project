const mongoose = require("mongoose");

const CountSchemas = mongoose.Schema({
   countstring:{
        type : String,
        required: true,
   },
   count:{
       type : Number,
       required: true,
   },
      
});
module.exports = mongoose.model("Count",CountSchemas);