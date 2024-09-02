const logger = require("../utils/logger"); 
const Movie = require("../models/movie"); 

// allow filtering based on: Name, Language, status, rating
// allow sortBy based on: rating, language, runtime
// sortBy=runtime?asc
// allow pagination based on page and limit params
// searchText based searching

module.exports.getMovies = async (req, res) => { 
    try { 
        // filtering by optimizing query parameters 
        const findParams = {}; 
        const sortParams = {}; 

        // query based on either search text or filters 
        if (req.query.searchText) { 
            const regex = new RegExp(req.query.searchText, 'i'); 
            findParams['$or'] = [ 
                { name: regex }, 
                { summary: regex } 
            ]; 
        } 
        else { 
            // filters 
            req.query.name && (findParams.name = req.query.name); 
            req.query.language && (findParams.language = req.query.language); 
            req.query.status && (findParams.status = req.query.status); 
            req.query.rating && (findParams["rating.average"] = { $gte: parseInt(req.query.rating) }); 
        } 

        // items rendered in single page 
        const perPageRender = req.query.limit || 20; 

        // setting sortBy and its order 
        if (req.query.sortBy) { 
            const [sortBy, order] = req.query.sortBy.split(":"); 
            sortParams[sortBy] = order === "asc" ? 1 : -1; 
        } 
        else { 
            // default type for sortBy 
            sortParams['updated'] = 1; 
        } 

        // using page * limit 
        const movies = await Movie.find(findParams).sort(sortParams).limit(perPageRender).skip((req.query.page * perPageRender) || 0); 
        res.send(movies); 
    } 
    catch (e) { 
        res.status(500).send(e); 
        logger.error(`Error occurred: ${e} at ${req.url} and method: ${req.method}`); 
    } 
};
