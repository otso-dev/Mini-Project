const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
        comment:{
            type : String,
            required: true,
        },
        date:{
            type : Date,
            required: true,
            unique: true,
        },
        articles_Nickname:{
            type : String,
        },
        my_Nickname:{
            type : String,
        },
        comment_id :{
            type : Number,
        },
});
module.exports = mongoose.model("comments",commentSchema);