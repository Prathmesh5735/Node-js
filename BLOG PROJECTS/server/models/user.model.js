
const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
},{
    versionKey:false,
    timestamps:true
})


const UserModel=mongoose.model("User",userSchema)

module.exports=UserModel