import express from 'express'
import { connectDB} from './db.js'
import { post_book, read_all_books, delete_book, update_book, read_books_by_year, find_book_by_author } from './model.js'

// initizlizing express instance with constant app
const app = express()
// adding the localhost port
const PORT = 3000

// middleware to parse json requests
app.use(express.json())

//connect to mongodb
connectDB().then(()=>{
    console.log("Database connection established")
}).catch(error=>{
    console.log("Database connection failed", error)
})

// function to insert a book
app.post('/', async (req,res)=>{
    post_book(req, res)
})

// function to list all books
app.get('/', async (req, res)=>{
    read_all_books(req, res)
})

// function to delete a book
app.delete('/:id', async (req, res)=>{
    delete_book(req, res)
})

// function to update a book
app.put('/:id', async (req, res)=>{
    update_book(req, res)
})

// function to sort books by year
app.get('/year-sort', async(req, res)=>{
    read_books_by_year(req, res)
})

// find book by author
app.get('/find-book-by-author', async(req, res)=>{
    find_book_by_author(req, res)
})

// check to see if the app is listening on the port correctly
app.listen(PORT, ()=> console.log(`Server running on port http://localhost:${PORT}`))
