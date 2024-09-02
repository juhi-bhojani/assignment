const mongoose = require("mongoose"); 
const dotenv = require("dotenv"); 

dotenv.config({ path: '././config.env' }); 

// connecting to mongoose database
mongoose.connect(process.env.DATABASEURL); 
