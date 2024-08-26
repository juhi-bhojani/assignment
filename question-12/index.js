// debounce function

const debounce = (func,delay) => {
    let timer;
    return (...args) => {
        // clear timeout in case one exists and reset again
        clearTimeout(timer)
        timer = setTimeout(()=>{
            // calling the function after min specified delay
            func(...args)
        },delay)
    }
}

// throttle function

const throttle = (func,delay) =>{
    // check if function isn't already running
    let isRunning = false
    return (...args) =>{
        if(!isRunning){
            isRunning = true 
            // calling the function
            func(...args)
            // setting this flag to false after specified delay
            setTimeout(()=>{
                isRunning = false
            },delay)
        }
    }
}