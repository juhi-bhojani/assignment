const express = require("express"); 
const auth = require("../middleware/auth"); 
const { getMovies } = require("../controllers/movie"); 

const router = new express.Router(); 

// route to get all movies 
router.get("/movie", auth, getMovies); 

module.exports = router;
