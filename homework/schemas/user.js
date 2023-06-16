const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    nickname : String,
    password : String
});
UserSchema.virtual("user_Id").get(function(){
    return this._id.toHexString();
});
UserSchema.set("toJSON",{
   vitrtuals: true, 
});
module.exports = mongoose.model("users",UserSchema);