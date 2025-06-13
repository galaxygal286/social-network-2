import {Request,Response,NextFunction} from "express"

export class ErrorResponse extends Error {
    status: number;
    constructor(status:number, message:string){
        super(message)
        this.status=status
    }
  }

const ErrorHandler=(error:ErrorResponse,req:Request,res:Response,next:NextFunction)=>{
    console.error(error.stack)
    res.status(error.status || 500).json({
        message:error.message || "Internal server error"
    })
}

export default ErrorHandler