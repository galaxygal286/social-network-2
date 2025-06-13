import {validationResult} from "express-validator"
import {Request,Response,NextFunction,RequestHandler} from "express"


export const ValidateRequest=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()) return next();
    res.status(400).json({
        message:"Validation error",
        errors:errors.array().map(e=>e.msg)
    })
}