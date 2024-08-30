const numOfVowels = (str) =>{
    let num = 0
    str = str.toLowerCase()
    for(let alphabet of str){
        if(alphabet==="a" || alphabet==="e" || alphabet==="i" || alphabet==="o" || alphabet==="u"){
            num+=1
        }
    }
    return num
}

// optimized approach
const numOfVowel = (str) => {
    return str.toLowerCase().split('').reduce((acc,ele)=>"aeiou".includes(ele) ? ++acc : acc,0)
}