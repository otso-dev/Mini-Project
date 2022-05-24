const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
        title: {
            type : String,
            required: true,
        },
        names:{
            type : String,
            required: true,
        },
        comment:{
            type : String,
            required: true,
        },
        date:{
            type : String,
            required: true,
            unique: true,
        },
        password: {
            type : Number,
            required: true,
        },
        Name_Id:{
            type : Number,
            required :true,
            unique:true,
        },
        
});
module.exports = mongoose.model("articles",articlesSchema);