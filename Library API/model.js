import { client } from './db.js'

// post method
async function post(req,res){
    try{
        // connect to libraryData database
        const clientDB = client.db("libraryData");
        // connect to the correct cluster
        const collection = clientDB.collection("Books")

        // extract data from the request body
        const {title, author, year} = req.body

        // validate returns
        if(!title || !author || !year){
            return res.status(400).json({error:"All fields title, author, and year are required"})
        }

        const doc = {
            title:title,
            author:author,
            year:parseInt(year) // ensure year is stored as a number
        }

        // insert the document in the collection
        const result = await collection.insertOne(doc)
        res.status(201).json({message:"Document added successfully", insertedId:result.insertedId})
    }catch(error){
        console.log("Error inserting document", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export {post}