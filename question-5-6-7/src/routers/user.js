const express = require("express"); 
const auth = require("../middleware/auth"); 
const { createUser, loginUser, logoutUser, refreshToken } = require("../controllers/user"); 

const router = new express.Router(); 

// method to create user
router.post("/user", createUser); 

// method to login user
router.post("/user/login", loginUser); 

// post method to logout user
router.post("/user/logout", auth, logoutUser); 

// refresh token endpoint
router.post("/refresh", refreshToken); 

module.exports = router;
