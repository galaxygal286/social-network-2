import {checkSchema,validationResult} from "express-validator"



const AuthValidator={
    register:checkSchema({
            name:{
                notEmpty:{
                    errorMessage:"Name is required"
                }
            },
            email: {
                notEmpty:{
                    errorMessage:"Email is required"
                },
                isEmail:{
                    errorMessage:"Invalid email"
                } 
            },
            password: { 
                notEmpty:{
                    errorMessage:"Password is required"
                },
            },
        }),
    login:checkSchema({
        email: {
            notEmpty:{
                errorMessage:"Email is required"
            },
            isEmail:{
                errorMessage:"Invalid email"
            } 
        },
        password: { 
            notEmpty:{
                errorMessage:"Password is required"
            },
        },
    })
}

export default AuthValidator