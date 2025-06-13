import {checkSchema,validationResult} from "express-validator"



const UserValidator={
    updateProfile:checkSchema({
            name:{
                notEmpty:{
                    errorMessage:"Name is required"
                }
            },
        })
}

export default UserValidator