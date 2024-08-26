const mongoose = require("mongoose")
const validator = require("validator")
const bcrpyt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secretKey = "dd9d00e7c4c7865505417a6751993a8b521f992a27c13f5893a40fe7afae6d1c"

// creating userSchema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:{
            unique:true
        },
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password can't contain the word 'password'")
            }
        }
    }
},{
    // adds created at and updated at fields in database
    timestamps:true
})

// methods are available on instance of models 
userSchema.methods.generateAuthToken = async function(){
    const user = this
    // first argument is payload, second is secret  
    const accessToken= jwt.sign({id:user._id.toString()},secretKey,{expiresIn:"1h"})
    const refreshToken= jwt.sign({id:user._id.toString()},secretKey,{expiresIn:"1 week"})
    return {accessToken,refreshToken}
}


// static method are available on models
// adding a static method to verify credentials
userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({"email":email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isValidPassword = await bcrpyt.compare(password,user.password)
    if(!isValidPassword){
        throw new Error("Unable to login")
    }
    return user
}

// adding middleware in order to store hashed password in database
// first arguement is name of event
userSchema.pre('save',async function(next){
    // this refers to the user which will now be saved in database
    const user = this

    // only updating password in case it is being modified or saved
    if(user.isModified('password')){
        user.password = await bcrpyt.hash(user.password,8)
    }

    // calling next ensures that data gets saved
    next()
})

// creating user model
const User = mongoose.model('User',userSchema)

module.exports = User