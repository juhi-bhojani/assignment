const fs = require("fs")
const { text } = require("stream/consumers")

const data = {}

// reading data from files asynchronously
fs.readFile("input-1.txt",'utf-8',(err,text)=>{
    if(err){
        return console.log("err")
    }
    data['inputFile1'] = text
})

fs.readFile("input-2.txt",'utf-8',(err,text)=>{
    if(err){
        return console.log("err")
    }
    data['inputFile2'] = text
})

fs.readFile("input-3.txt",'utf-8',(err,text)=>{
    if(err){
        return console.log("err")
    }
    data['inputFile3'] = text
})

// fetching data from API's
fetch("https://dogapi.dog/api/v2/breeds")
.then((response)=>{
    return response.json()
})
.then((text)=>{
    data['dogInfo'] = text.data
})
.catch(err=>{
    console.log(err)
})

fetch("https://dogapi.dog/api/v2/breeds")
.then((response)=>{
    return response.json()
})
.then((text)=>{
    data['meowInfo'] = text.data
})
.catch(err=>{
    console.log(err)
})

fetch("https://dattebayo-api.onrender.com/characters")
.then((response)=>{
    return response.json()
})
.then((text)=>{
    data['animeInfo'] = text.characters
})
.catch(err=>{
    console.log(err)
})
