// Promisify fs module
const fs = require("fs").promises;

// Reading data from files asynchronously
async function readFile(fileName) {
    try {
        const text = await fs.readFile(fileName, 'utf-8');
        return {
            [fileName]: text
        };
    } catch (e) {
        console.log(`Unable to read file ${fileName}: ${e.message}`);
        return {};
    }
}

// Reading data from API asynchronously
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const text = await response.json();
        return {
            [url]: text
        };
    } catch (e) {
        console.log(`Error fetching from ${url}: ${e.message}`);
        return {};
    }
}

async function run() {
    try {
        // Run everything asynchronously
        const data = await Promise.allSettled([
            readFile("input-3.txt"),
            readFile("input-1.txt"),
            readFile("input-2.txt"),
            fetchData("https://dattebayo-api.onrender.com/characters"),
            fetchData("https://dogapi.dog/api/v2/breeds")
        ]);

        console.log(data);
    } catch (e) {
        console.log(`Error occurred: ${e.message}`);
    }
}

run();
