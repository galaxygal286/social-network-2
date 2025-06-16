import { Router } from "express"

import PostController from "../controllers/PostController"
import PostValidator from "../validators/PostValidator"
import { ValidateRequest } from "../middlewares/validation"
import { Protect } from "../middlewares/auth"
import { upload } from '../middlewares/upload';


const router = Router()

router.use(Protect)

router.post(
  '/',
  upload.fields([
    { name: 'post_image', maxCount: 1 },
  ]),
  PostValidator.createPost,
  ValidateRequest,
  PostController.createPost
)

router.get(
  '/',
  PostValidator.fetchPosts,
  ValidateRequest,
  PostController.fetchPosts
)

router.get('/:postId',
  PostValidator.getPost,
  ValidateRequest,
  PostController.getPost
);

router.post(
  '/like',
  PostValidator.likePost,
  ValidateRequest,
  PostController.likePost
)

router.post(
  '/unlike',
  PostValidator.unlikePost,
  ValidateRequest,
  PostController.unlikePost
)
router.get(
  '/commentsx',
  PostValidator.fetchComments,
  ValidateRequest,
  PostController.fetchComments
)
router.post(
  '/comments',
  PostValidator.createComment,
  ValidateRequest,
  PostController.createComment
)

export default router