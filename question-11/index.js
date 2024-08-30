const refineString = (str) =>{
    let refinedString = ""
    for(let alphabet of str){
        if(alphabet.match(/[a-z]/i)){
            refinedString = refinedString.concat(alphabet)
        }
    }
    return refinedString
}

const reverseString = (str) => {
    return str.split("").reverse().join("");
}

const isPalindrome = (str) =>{
    str = str.toLowerCase()
    str = refineString(str)
    if(str === reverseString(str)){
        return true
    }
    return false
}

console.log(isPalindrome("hi","by"))
