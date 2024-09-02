const express = require("express"); 
// connecting to database
require("./db/mongoose"); 
const logger = require("./utils/logger"); 
const logMiddleware = require("./middleware/log"); 
const movieRouter = require("./routers/movie"); 
const userRouter = require("./routers/user"); 

const app = express(); 

app.use(logMiddleware); 

// parse incoming JSON to an object
app.use(express.json()); 

// add user router
app.use(userRouter); 

// add movie router
app.use(movieRouter); 

app.get("/", (req, res) => { 
    res.send("Welcome to Movie World!!"); 
}); 

app.listen(3000, () => { 
    logger.info("Server is up and running"); 
    // console.log("server is up and running"); 
}); 
