const dotenv = require("dotenv"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/user"); 
const logger = require("../utils/logger"); 

dotenv.config({ path: "././config.env" }); 

module.exports.createUser = async (req, res) => { 
    const user = new User(req.body); 

    try { 
        const { name, email } = await user.save(user); 
        const { accessToken, refreshToken } = await user.generateAuthToken(); 

        // Set cookies 
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 60 * 60 * 1000 // 60 minutes 
        }); 
        
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days 
        }); 

        res.send({ name, email }); 
    } 
    catch (e) { 
        res.status(400).send(e.message); 
        logger.error(`Error occurred: ${e} at ${req.url} and method: ${req.method}`); 
    } 
}; 

module.exports.loginUser = async (req, res) => { 
    try { 
        const user = await User.findByCredentials(req.body.email, req.body.password); 
        const { accessToken, refreshToken } = await user.generateAuthToken(); 

        // Set cookies 
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 60 * 60 * 1000 // 60 minutes 
        }); 
        
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days 
        }); 

        res.send({ 
            email: user.email, 
            name: user.name 
        }); 
    } 
    catch (e) { 
        res.status(400).send(e.message); 
        logger.error(`Error occurred: ${e} at ${req.url} and method: ${req.method}`); 
    } 
}; 

module.exports.logoutUser = async (req, res) => { 
    res.send("Logged out successfully"); 
}; 

module.exports.refreshToken = async (req, res) => { 
    const { email, refreshToken } = req.body; 
    try { 
        const decoded = jwt.verify(refreshToken, process.env.SECRETKEY); 
        const user = await User.findOne({ "_id": decoded.id }); 
        if (!user) { 
            throw new Error(); 
        } 
        if (user.email !== email) { 
            throw new Error(); 
        } 
        const accessToken = await user.refreshToken(); 
        
        // Set cookies 
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 60 * 60 * 1000 // 60 minutes 
        }); 
        
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict', // prevents CSRF attacks 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days 
        }); 

        res.send({ 
            email: user.email, 
            name: user.name 
        }); 
    } 
    catch (e) { 
        res.status(400).send(e.message); 
        logger.error(`Error occurred: ${e} at ${req.url} and method: ${req.method}`); 
    } 
};