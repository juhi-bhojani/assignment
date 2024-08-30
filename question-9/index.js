// program to check if it's an anagram or not

const isAnagram = (str1,str2) =>{
    // in case length isn't same directly return false
    if(str1.length!==str2.length){
        return false
    }
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    const freq = {}
    for(let alphabet of str1){
        if(alphabet.match(/[a-z]/i)){
            if (!freq[alphabet]){
                freq[alphabet] = 0
            }
            freq[alphabet]+=1
        }
    }
    for(let alphabet of str2){
        if(alphabet.match(/[a-z]/i)){
            if(!freq[alphabet]){
                return false
            }
            freq[alphabet]-=1
        }
    }
    for(let key in freq){
        if (freq[key]!==0){
            return false
        }
    }
    return true
}

// optimized approach 

const isAnagrams = (str1,str2)=>{ 
    // directly return false if not of same length 
    if(str1.length!==str2.length){ 
        return false 
    }
    // sort and compare 
    str1 = str1.toLowerCase().split("").sort().join("") 
    str2 = str2.toLowerCase().split("").sort().join("") 

    if(str1===str2){ 
        return true 
    } 
    return false 
} 

console.log(isAnagram("hello2","llohe2"))