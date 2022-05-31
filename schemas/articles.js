const { string } = require("joi");
const mongoose = require("mongoose");
const User = require("./user")
const articlesSchema = mongoose.Schema({
        title: {
            type : String,
            required: true,
        },
        comment:{
            type : String,
            required: true,
        },
        date:{
            type : Date,
            required: true,
            unique: true,
        },
        password:{
            type : Number,
            require : true,
        },
        NickName: {
            type : String,
            unique : true,
        },
});     

module.exports = mongoose.model("articles",articlesSchema);