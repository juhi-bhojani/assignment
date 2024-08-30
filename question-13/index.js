// a function used to maintain size of cache and remove elements which are used less frequently
// just to depict usage in case of a limit needed for cache
function limitSizeOfCache(cache,size){
    let min = 0
    let minKey
    if(cache.length>size){
        for (key in cache){
            if(min>= cache[key].count){
                min = cache[key].count
                minKey = key
            }
        }
        delete cache[key]    
    }
    return cache
}

function memoize(func){
    let cache = {}
    return (...args) =>{
        const key = JSON.stringify(...args)

        if(cache[key]){
            cache[key].count +=1
            return cache[key].result
        }

        const result = func(...args)
        cache[key] = {
            result,
            count:0
        }
        return result
    }
}