import express from "express"
import dotenv from 'dotenv'
import colors from 'colors'
import {connectDB} from './db.js'
import router from "./routes.js"

const port = process.env.PORT || 3000


dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false }))

app.use('/', router)

app.listen(port, ()=>{
    console.log(`Server is listening at port:${port}`)
})