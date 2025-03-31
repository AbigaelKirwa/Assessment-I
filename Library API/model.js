import { client } from './db.js'
import { ObjectId } from 'mongodb';

// connect to libraryData database
const clientDB = client.db("libraryData");
// connect to the correct cluster
const collection = clientDB.collection("Books")

// post a book
async function post_book(req,res){
    try{
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
        // catch and log any error
        console.log("Error inserting document", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

// fetch all books
async function read_all_books(req, res){
    try{
        // find books with no query and convert to array as it is stored as a cursor
        const result = await collection.find().toArray();
        // return result in json with status of 201
        res.status(201).json(result)
    }catch(error){
        // catch and log any error
        console.log("Error reading documents", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

// fetch books sorted by year
async function read_books_by_year(req, res){
    try{
        // define an empty query document
        const query = {}
        // sort in ascending order by year
        const sort = {year: 1}
        const result = await collection.find(query).sort(sort).toArray()
        res.status(201).json(result)
        // for await (const doc of cursor){
        //     console.dir(doc)
        // }
        
    }catch(error){
        // catch and log any error
        console.log("Error reading documents", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

// delete a book
async function delete_book(req, res){
    try{
        // fetching the ID from the URL
        const bookId = req.params.id;

        // perform the delete operation
        const delete_result = await collection.deleteOne({_id:new ObjectId(bookId)})

        // check if document was deleted
        if(delete_result.deletedCount === 0){
            return res.status(404).json({message:"Book not found"})
        }

        //if successful send a success response
        res.status(201).json({message: `Book with id ${bookId} deleted successfullly`})
    }catch(error){
        // catch and log any error
        console.log("Error reading documents", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

// update a book
async function update_book(req, res){
    try{
        // fetch id from URL
        const bookId = req.params.id

        // specify what is required in the body
        const {title, author, year} = req.body

        // specify the updated doc
        const doc = {
            title:title,
            author:author,
            year:parseInt(year)
        }

        // set check to ensure one is specified 
        if(!title & !author & !year){
            res.status(500).json({message:"Either the title, author, or year is required"})
        }
        // create update object dynamically
        const updateFields = {};
        if (title) updateFields.title = title
        if (author) updateFields.author = author
        if (year) updateFields.year = year

        const update_result = await collection.updateOne(
            {_id:new ObjectId(bookId)}, 
            {$set:updateFields}
        );

        //check if document was updated
        if (update_result.matchedCount === 0){
            return res.status(400).json({message:"Book not found"})
        }

        res.status(201).json("updated book successfully")

    }catch(error){
        // catch and log any error
        console.log("Error reading documents", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export {post_book, read_all_books, delete_book, update_book, read_books_by_year}