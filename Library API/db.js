import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// fetch mongo uri connection string
const uri = process.env.MONGO_URI;
// creating an instance of Mongo Client
const client = new MongoClient(uri, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    },
    family:4 // Force IPv4 to avoid ENETUNREACH errors
});

// exporting an asynchronous function that attempts to connect with mongodb
export async function connectDB(){
    try{
        // connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB")
        return client.db();
    }catch(error){
        console.log("MongoDB returned an error", error)
        // close client after error
        await client.close()
    }
}

export {client}