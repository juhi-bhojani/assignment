const express = require("express")
const Movie = require("../models/movie")
const logger = require("../utils/logger")
const auth = require("../middleware/auth")

const router = new express.Router()

// route to get all movies
// allow filtering based on : Name, Language, status, rating
// allow sortBy based on : rating, language, runtime
// sortBy=runtime?asc
// allow pagination based on skip and limit params
router.get("/movies",auth,async(req,res)=>{
    try{

        // filtering by optimizing query parameters
        const findParams = {}
        const sortParams = {}
        req.query.name && (findParams.name=req.query.name)
        req.query.language && (findParams.language=req.query.language)
        req.query.status && (findParams.status=req.query.status)
        req.query.rating && (findParams["rating.average"]={$gte:parseInt(req.query.rating)})

        //setting sortBy and it's order
        if(req.query.sortBy){
            const [sortBy,order] = req.query.sortBy.split(":")
            sortParams[sortBy] = order==="asc" ? 1:-1
        }
        
        const movies = await Movie.find(findParams).sort(sortParams).limit(req.query.limit).skip(req.query.skip)
        res.send(movies)
}
    catch(e){
        res.status(500).send()
        logger.error(`Error occured:${e} at ${req.url} and method : ${req.method}`)
    }
})

module.exports = router