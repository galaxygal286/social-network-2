import Layout from "../components/Layout"
import usePostStore from '../store/postStore'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Comment as IComment } from '../types'
import { format } from 'date-fns'
import { ArrowLeftIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import LikeButton from '../components/LikeButton'
import CreateComment from '../components/CreateComment'
import Comment from '../components/Comment'

const PostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const { currentPost, getPost, comments,fetchComments,clearComments,clearCurrentPost } = usePostStore()
    const navigate = useNavigate()

    const getProfileImage = () => {
        if (currentPost?.profile_image_url)
            return import.meta.env.VITE_UPLOADS + "/" + currentPost?.profile_image_url
    }

    const getPostImage = () => {
        if (currentPost?.post_image) {
            return import.meta.env.VITE_UPLOADS + "/" + currentPost?.post_image
        }
    }

    useEffect(() => {
        getPost(Number(postId))
        fetchComments(Number(postId))
        return ()=>{clearComments();clearCurrentPost()}
    }, [])

    return <>
        <Layout>
            <div className="px-2 flex items-center mb-4">
                <button className="rounded-full p-2 hover:bg-gray-200 cursor-pointer mr-8" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div>
                    <div className="text-xl font-bold">Post</div>
                </div>
            </div>
            {currentPost && <>
                <div className="flex border-b-1 border-gray-100 px-7 pt-7 pb-4 duration-100 ease-in-out">
                    <div>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <img className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" src={getProfileImage() || "/default_profile.png"} alt="profile image" />
                        </div>
                    </div>
                    <div className="flex-grow-1 px-4">
                        <div className="space-x-1 text-gray-700">
                            <span className="text-gray-800 font-bold">{currentPost.user_name}</span>
                            <span>·</span>
                        </div>
                        <div className="wrap-break-word whitespace-pre-wrap mb-2 text-gray-700">
                            {currentPost.text}
                        </div>
                        <div className="flex items-start overflow-hidden max-h-[512px] h-auto">
                            <img className="max-h-[512px] rounded-xl" src={getPostImage()} alt="" />
                        </div>
                        <div className='py-4'>{format(new Date(currentPost.created_at), "hh:mm a '·' MMM d, yyyy")}</div>
                        <div className="flex space-x-3 pt-3">
                            <button className="flex items-center rounded-full space-x-1.5 hover:bg-sky-100 hover:text-sky-700 px-3 py-1">
                                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                                <span>{currentPost.comments_count}</span>
                            </button>
                            <LikeButton post={currentPost} />
                        </div>
                    </div>
                </div>
                <div className='pt-5'>
                    <CreateComment post_id={currentPost.id} />
                </div>
                {comments.map((comment: IComment) => <Comment key={comment.id} data={comment} />)}
            </>}
            {!currentPost && <>
                <div className='flex items-center justify-center pt-10'>
                    <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </>}
        </Layout>
    </>
}

export default PostPage