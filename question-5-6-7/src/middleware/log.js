const logger = require("../utils/logger")

// middleware to log incoming requests
const log = (req,res,next)=>{
    logger.info(`Incoming request at ${req.url} and method ${req.method}`)
    next()
}

module.exports = log