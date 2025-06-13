import {Router} from "express"

import UserController from "../controllers/UserController"
import UserValidator from "../validators/UserValidator"
import {ValidateRequest} from "../middlewares/validation"
import { Protect } from "../middlewares/auth"
import { upload } from '../middlewares/upload';


const router=Router()

router.use(Protect)

router.post(
    '/profile',
    upload.fields([
        { name: 'profile_image', maxCount: 1 },
        { name: 'cover_image', maxCount: 1 },
      ]),
    UserValidator.updateProfile,
    ValidateRequest,
    UserController.updateProfile
)

export default router