import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"

import ErrorHandler from './middlewares/errorHandler'
import AuthRoutes from "./routes/AuthRoutes"
import UserRoutes from "./routes/UserRoutes"
import PostRoutes from "./routes/PostRoutes"

dotenv.config()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(helmet())

app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });
app.use('/uploads', express.static('uploads'));

app.use('/api/auth',AuthRoutes)
app.use('/api/users',UserRoutes)
app.use('/api/posts',PostRoutes)

app.get("/",(req,res)=>{
    res.json({message:"hello world"})
})

app.use(ErrorHandler)

const PORT=parseInt(process.env.PORT || '5000')

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})