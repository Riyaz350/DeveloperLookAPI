const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {type:String, unique:true},
    password:String,
    token:String,
    verified:Boolean,
    twoFAascii:{ type: String }
})



const User = mongoose.model("User", userSchema)

module.exports= User