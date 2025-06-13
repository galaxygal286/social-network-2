import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import UserService from "../services/UserService"
import { ErrorResponse } from "../middlewares/errorHandler"
import { CustomRequest } from "../middlewares/auth"
import path from "path"
import fs from 'fs'

const UserController = {
    updateProfile: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId
        const { name, bio } = req.body

        const files = req.files as {
            profile_image?: Express.Multer.File[];
            cover_image?: Express.Multer.File[];
        };

        const profileImage = files?.profile_image?.[0]?.filename;
        const coverImage = files?.cover_image?.[0]?.filename;

        if (profileImage || coverImage) {
            
            const user = await UserService.getUserById(userId)

            if (!user) 
                throw new ErrorResponse(404, "User not found")

            if (profileImage) {
                const previousProfileImage = user?.profile_image_url
                if (previousProfileImage) {
                    const previousPath = path.join(__dirname, '../../uploads', previousProfileImage);
                    if (fs.existsSync(previousPath)) 
                        fs.unlinkSync(previousPath);
                }
            }
            
            if (coverImage) {
                const previousCoverImage = user?.cover_image_url
                if (previousCoverImage) {
                    const previousPath = path.join(__dirname, '../../uploads', previousCoverImage);
                    if (fs.existsSync(previousPath)) 
                        fs.unlinkSync(previousPath);
                }
            }
        }

        const updatedUser = await UserService.updateProfile(userId, name, bio, profileImage, coverImage)
        res.status(200).json({
            name: updatedUser?.name,
            bio: updatedUser?.bio,
            profile_image_url: updatedUser?.profile_image_url,
            cover_image_url: updatedUser?.cover_image_url
        })
    })
}

export default UserController