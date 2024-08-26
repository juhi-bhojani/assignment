// program to check if it's an anagram or not

const isAnagram = (str1,str2) =>{
    // in case length isn't same directly return false
    if(str1.length!==str2.length){
        return false
    }
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    const freq = {}
    for(alphabet of str1){
        if(alphabet.match(/[a-z]/i)){
            if (!freq[alphabet]){
                freq[alphabet] = 0
            }
            freq[alphabet]+=1
        }
    }
    for(alphabet of str2){
        if(alphabet.match(/[a-z]/i)){
            if(!freq[alphabet]){
                return false
            }
            freq[alphabet]-=1
        }
    }
    for(key in freq){
        if (freq[key]!==0){
            return false
        }
    }
    return true
}

console.log(isAnagram("hello2","llohe2"))