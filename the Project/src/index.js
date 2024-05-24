// require('dotenv').config({path: './env'})    //cant' be used here
import 'dotenv/config' 
// import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constant.js";
import connectionDB from './db/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';



const app= express()
const port= process.env.PORT || 8000;

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true
    }
))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hi again from the project');
})




connectionDB()
.then(() => {
    app.listen(port, () => {
        console.log("Server is listening at port: ", port)
    })
    app.on('error', (error) => {
        console.log("Error while listening in the app :: ", error);
    })
})
.catch((err) => {
    console.log("DB connection error :: ", err)
})





//method 1 of database connection---

// ;( async ()=> {
//     try {
        
//        const connectiion= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     //    const connectiion= await mongoose.connect(`mongodb+srv://ankit:n2d0Y8OkyLmGTsTj@cluster0.fk9ez6p.mongodb.net/${DB_NAME}`);
//         app.on("error", (error)=> {
//                 console.log(`Error while listening :: ${error}`)
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening at port ${port}`)
//             console.log(connectiion)
//         })

//     } catch (error) {
//         console.error("Error while DB connectiion ::", error)
//     }
// })()