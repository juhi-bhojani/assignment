const fs = require("fs")
let data = ""

// Create a readable stream
const readerStream = fs.createReadStream('input.txt');

readerStream.on("data",(chunk)=>{
    data+= " " + chunk
    console.log("---------------------")
})

// printing data at end of stream
readerStream.on("end",()=>{
    console.log(data)
})

// pipe function can be used in case there is a need to send data to a writable stream