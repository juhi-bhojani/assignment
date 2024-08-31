const secretKey = "dd9d00e7c4c7865505417a6751993a8b521f992a27c13f5893a40fe7afae6d1c"
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const logger = require("../utils/logger")


module.exports.createUser = async(req,res)=>{
    const user = new User(req.body)

    try{
        const {name,email} = await user.save(user)
        const token = await user.generateAuthToken()
        res.send({name,email,...token})
    }
    catch(e){
        res.status(400)
        logger.error(`Error occured : ${e} at ${req.url} and method:${req.method}`)
    }
}

module.exports.loginUser = async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            email:user.email,
            name:user.name,
            ...token
        })
    }
    catch(e){
        res.status(400)
        logger.error(`Error occured : ${e} at ${req.url} and method:${req.method}`)
    }
}

module.exports.logoutUser = async(req,res)=>{
    res.send("Logged out successfully")
}

module.exports.refreshToken = async(req,res)=>{
    const {email,refreshToken} = req.body
    try{
        const decoded = jwt.verify(refreshToken,secretKey)
        const user = await User.findOne({"_id":decoded.id})
        if(!user){
            throw new Error()
        }
        if(user.email!==email){
            throw new Error()
        }
        const accessToken = await user.refreshToken() 
        res.send({ 
            email:user.email, 
            name:user.name, 
            accessToken, 
            refreshToken 
        }) 

    }
    catch(e){
        res.status(400)
        logger.error(`Error occured : ${e} at ${req.url} and method:${req.method}`)
    }
}