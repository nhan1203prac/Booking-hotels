import express from 'express'
import mongoose from 'mongoose';
import authRoute from './router/auth.js'
import roomsRoute from './router/rooms.js'
import usersRoute from './router/users.js'
import hotelsRoute from './router/hotels.js'
import cookieParser from 'cookie-parser';
import cors from "cors"
import bodyParser from 'body-parser'

const app = express()

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// router
app.use('/api/auth',authRoute)
app.use('/api/room',roomsRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/users',usersRoute)




app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})
mongoose.connect('mongodb://localhost:27017/book_app',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('Connect to DB')
    app.listen(8800,()=>{
        console.log("Connect to backend");
    })
})
.catch((err)=>{
    console.log('err',err)
})

