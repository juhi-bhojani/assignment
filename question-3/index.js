// Connecting to MongoDB using native driver 

const {MongoClient} = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017/"
const databaseName = "movieData"
const client = new MongoClient(connectionURL)

async function run(){
    try{
        //establish connection with database
        await client.connect()

        // selecting a particular database
        const db = client.db(databaseName)

        // selecting a collection
        const collection = db.collection("movie")

        // finding all documents within the collection
        // returns a cursor which is then converted to array
        const results = await collection.find().toArray()

        console.log(results)
    }
    catch(err){
        console.log("Error!",err)
    }
    finally{
        await client.close()
    }

}

run()

// not changing anything here, instead using appropriate implementation with Enviorment variables and structure in question 5-6-7