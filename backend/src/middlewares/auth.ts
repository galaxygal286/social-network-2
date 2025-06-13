import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ErrorResponse } from "./errorHandler";
import jwt, { Secret } from 'jsonwebtoken'

export interface CustomRequest extends Request{
  userId:number
}

interface Decoded{
  id:number
}

export const Protect=asyncHandler(async (req:Request, res:Response,next:NextFunction)=>{
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ErrorResponse(401,"Not authorized")
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as Decoded;
      (req as CustomRequest).userId = decoded.id;
      next();
    } catch (e) {
      throw new ErrorResponse(401,"Not authorized")
    }
})