const jwt = require("jsonwebtoken")
const User = require("../models/user")
const logger = require("../utils/logger")

const secretKey = "dd9d00e7c4c7865505417a6751993a8b521f992a27c13f5893a40fe7afae6d1c"

const auth = async (req,res,next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token,secretKey)
        const user = await User.findOne({"_id":decoded.id})
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    }
    catch(e){
        res.status(400).send(`Please authenticate!!!`)
        logger.error(`Access by unauthriozed user at ${req.url} and ${req.method}`)
    }
}

module.exports = auth