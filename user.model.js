// name:document.getElementById("name").value,
//         email:document.getElementById("email").value,
//         username:document.getElementById("username").value,
//         password:document.getElementById("password").value,
//         mobile:document.getElementById("mobile").value,
//         description:document.getElementById("description").value,

const mongoose=require("mongoose")

const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true},
    description:{type:String,required:false},
    

},{
    versionKey:false,
    timestamps:true
})

userSchema.pre("save",function (next){
    if(!this.isModified("password"))
    return next()

    const hash=bcrypt.hashSync(this.password,8)
    this.password=hash
    return next()
})

userSchema.methods.checkPassword=function (password){
    
    return bcrypt.compareSync(password,this.password)
     
  
}

module.exports=mongoose.model("user",userSchema)