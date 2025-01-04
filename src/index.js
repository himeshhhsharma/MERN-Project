// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

// this connectDB() function is async function, so it returns a promise.
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at Port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('MONGO db connection FAILED:',err);
})














/*
connecting database with writing the function on index.js
import express from express;

const app=express();
//Immediate Execute Function , IIFe
;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error: ",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        });
    }
    catch(err){
        console.log("Error: ",err);
        throw err;
    }
})()
*/