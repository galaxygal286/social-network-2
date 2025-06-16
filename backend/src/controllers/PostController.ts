import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import PostService from "../services/PostService"
import { CustomRequest } from "../middlewares/auth"
import { ErrorResponse } from "../middlewares/errorHandler"

const PostController = {
    createPost: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId
        const { text } = req.body

        const files = req.files as {
            post_image?: Express.Multer.File[];
        };

        const postImage = files?.post_image?.[0]?.filename;

        const createdPost = await PostService.createPost(userId, text, postImage)
        res.status(200).json({
            id: createdPost.id,
            user_id: createdPost.user_id,
            text: createdPost?.text,
            post_image: createdPost?.post_image,
            created_at: createdPost.created_at
        })
    }),
    fetchPosts: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId
        const { page, limit } = req.query
        const _page = Number(page)
        const _limit = Number(limit)
        const posts = await PostService.fetchPosts(userId, _page, _limit)
        res.json(posts)
    }),


    likePost: asyncHandler(async (req: Request, res: Response) => {
        const { post_id } = req.query;
        const _post_id = Number(post_id)
        const user_id = (req as CustomRequest).userId

        const post = await PostService.getPostById(_post_id, user_id);
        if (!post) {
            throw new ErrorResponse(404, "Post not found")
        }

        await PostService.likePost(_post_id, user_id);
        res.send("ok")
    }),
    unlikePost: asyncHandler(async (req: Request, res: Response) => {
        const { post_id } = req.query;
        const _post_id = Number(post_id)
        const user_id = (req as CustomRequest).userId

        const post = await PostService.getPostById(_post_id, user_id);
        if (!post) {
            throw new ErrorResponse(404, "Post not found")
        }

        await PostService.unlikePost(_post_id, user_id);
        res.send("ok")
    }),
    getPost: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId;
        const postId = Number(req.params.postId) ;
        const post = await PostService.getPostById(postId, userId)
        res.json(post)
    }),

    fetchComments: asyncHandler(async (req: Request, res: Response) => {
         const userId = (req as CustomRequest).userId;
        const {post_id} = req.query;
        const post = await PostService.getPostById(Number(post_id), userId);
        if (!post) {
            throw new ErrorResponse(404, "Post not found")
        }
        const comments = await PostService.fetchComments(Number(post_id))
        res.json(comments)
    }),
    createComment: asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as CustomRequest).userId
        const post_id = Number(req.body.post_id)
        const text = req.body.text
        const post = await PostService.getPostById(post_id, userId);
        if (!post) {
            throw new ErrorResponse(404, "Post not found")
        }
        const comment = await PostService.createComment(post_id, userId, text)
        res.json(comment)
    })
}

export default PostController