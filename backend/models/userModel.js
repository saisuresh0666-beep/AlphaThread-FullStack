const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    }, 
     email:{
        type:String,
        lowercase: true,
        required:true,
        unique:true
    },
      password:{
        type:String,
        required:true
    },
    address:
    {type:Object,},
  cartData: {
  type: Object,
  default: {}
}
},{minimize:false})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel
