import { HeartIcon } from "@heroicons/react/24/outline"
import usePostStore from "../store/postStore"
import { Post } from "../types"
import { useState } from "react"

interface Props {
    post: Post
}

const LikeButton = ({ post }: Props) => {
    const { likePost, unlikePost } = usePostStore()
    const [loading, setLoading] = useState(false)
    const handleLike = async (e: any) => {
        e.stopPropagation()
        setLoading(true)
        if (post.has_liked)
            await unlikePost(post.id)
        else
            await likePost(post.id)
        setLoading(false)
    }
    return <>
        <button onClick={handleLike} className="relative flex items-center rounded-full space-x-1.5 hover:bg-rose-100 hover:text-rose-700 px-3 py-1">
            <HeartIcon className="h-5 w-5" />
            <span>{post.likes_count}</span>
            {loading &&
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-rose-100 rounded-full">
                    <div className="w-4 h-4 border-2 border-rose-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
        </button>
    </>
}

export default LikeButton