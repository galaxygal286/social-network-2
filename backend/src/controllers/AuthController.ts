import {Request,Response} from "express"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import UserService from "../services/UserService"
import {ErrorResponse} from "../middlewares/errorHandler"

const AuthController={
    register:asyncHandler(async (req:Request, res:Response)=>{
        const {name, email, password}=req.body
        const user=await UserService.getUserByEmail(email)
        if(user){
            throw new ErrorResponse(400,"Email already in use")
        }
        await UserService.createUser({
            name,
            email,
            password
        })
        res.status(201).send("ok")
    }),
    login:asyncHandler(async (req:Request, res:Response)=>{
        const {email, password}=req.body
        const user=await UserService.getUserByEmail(email)
        if(!user){
            throw new ErrorResponse(400,"Invalid credentials")
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            throw new ErrorResponse(400,"Invalid credentials")
        }
        const payload={
            id:user.id,
            name:user.name,
            email:user.email
        }
        const token=jwt.sign(
            payload,
            process.env.JWT_SECRET || "secret",
            {
                expiresIn:"1d"
            }
        )
        res.json({
            token:token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                bio:user.bio,
                profile_image_url:user.profile_image_url,
                cover_image_url:user.cover_image_url,
                created_at:user.created_at,
            }

        })
    })
}

export default AuthController