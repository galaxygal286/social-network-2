import {Router} from "express"

import AuthController from "../controllers/AuthController"
import AuthValidator from "../validators/AuthValidator"
import {ValidateRequest} from "../middlewares/validation"


const router=Router()

router.post(
    '/register',
    AuthValidator.register,
    ValidateRequest,
    AuthController.register
)
router.post(
    '/login',
    AuthValidator.login,
    ValidateRequest,
    AuthController.login
)

export default router