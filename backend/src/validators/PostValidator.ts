import { checkSchema, validationResult } from "express-validator"



const PostValidator = {
    createPost: checkSchema({
        text: {
            notEmpty: {
                errorMessage: "Text is required"
            }
        },
    }),
    fetchPosts: checkSchema({
        page: {
            isInt: {
                errorMessage: "Page must be a number"
            }
        },
        limit: {
            isInt: {
                errorMessage: "Limit must be a number"
            }
        }
    }),
    likePost: checkSchema({
        post_id: {
            notEmpty: {
                errorMessage: "Post id is required"
            },
            isInt: {
                errorMessage: "Post id must be a number"
            }
        },
    }),
    unlikePost: checkSchema({
        post_id: {
            notEmpty: {
                errorMessage: "Post id is required"
            },
            isInt: {
                errorMessage: "Post id must be a number"
            }
        },
    }),
    getPost: checkSchema({
        postId: {
            notEmpty: {
                errorMessage: "Post id is required"
            },
            isInt: {
                errorMessage: "Post id must be a number"
            }
        },
    }),
    fetchComments: checkSchema({
        post_id: {
            notEmpty: {
                errorMessage: "Post id is required"
            },
            isInt: {
                errorMessage: "Post id must be a number"
            }
        },
    }),
    createComment: checkSchema({
        post_id: {
            notEmpty: {
                errorMessage: "Post id is required"
            },
            isInt: {
                errorMessage: "Post id must be a number"
            }
        },
        text:{
            notEmpty: {
                errorMessage: "Text is required"
            }
        }
    }),
}

export default PostValidator