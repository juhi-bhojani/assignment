const mongoose = require("mongoose")

// connecting to mongoose database
mongoose.connect("mongodb://127.0.0.1:27017/movieData")

// Works like an ODM and hence defining model
const User = mongoose.model("users",{})

// Retreive data
User.find({})
.then((data)=>{
    console.log(data);
    // close connection
    mongoose.connection.close()
})

