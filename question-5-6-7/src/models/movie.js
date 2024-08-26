const mongoose = require("mongoose")
const validator = require("validator")

// defining mongoose schema for movie data

const movieSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:false,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL")
            }
        }
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String
    },
    language:{
        type:String
    },
    genres:{
        type:Array
    },
    status:{
        type:String
    },
    runtime:{
        type:Number
    },
    premiered:{
        type:Date
    },
    officialSite:{
        type:String,
        required:false,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL")
            }
        }
    },
    schedule:{
        type:mongoose.Mixed
    },
    rating:{
        type:mongoose.Mixed
    },
    weight:{
        type:Number
    },
    network:{
        type:mongoose.Mixed
    },
    webChannel:{
        type:mongoose.Mixed
    },
    externals:{
        type:mongoose.Mixed
    },
    image:{
        type:mongoose.Mixed
    },
    summary:{
        type:String
    },
    updated:{
        type:Number
    },
    _links:{
        type:mongoose.Mixed
    }
})

const Movie = mongoose.model("Movie",movieSchema)

module.exports = Movie