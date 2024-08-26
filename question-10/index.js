const numOfVowels = (str) =>{
    let num = 0
    str = str.toLowerCase()
    for(alphabet of str){
        if(alphabet==="a" || alphabet==="e" || alphabet==="i" || alphabet==="o" || alphabet==="u"){
            num+=1
        }
    }
    return num
}
