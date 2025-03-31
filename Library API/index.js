import express from 'express'
import { connectDB} from './db.js'
import { post, read_all } from './model.js'

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
    post(req, res)
})

// function to list all books
app.get('/', async (req, res)=>{
    read_all(req, res)
})

// check to see if the app is listening on the port correctly
app.listen(PORT, ()=> console.log(`Server running on port http://localhost:${PORT}`))
