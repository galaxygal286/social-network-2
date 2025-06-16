import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline"
import { Post as IPost } from "../types"
import { formatDistanceToNow } from "date-fns"
import useAuthStore from "../store/authStore"
import LikeButton from "./LikeButton"
import { useNavigate } from "react-router"
interface Props {
    data: IPost
}


const Post = ({ data }: Props) => {
    const { user } = useAuthStore()
    const navigate=useNavigate()
   
    const getProfileImage = () => {
        if (data?.profile_image_url)
            return import.meta.env.VITE_UPLOADS + "/" + data?.profile_image_url
    }

    const getPostImage=()=>{
        if(data.post_image){
            return import.meta.env.VITE_UPLOADS + "/" + data.post_image
        }
    }

   
    return <>
        <div onClick={()=>navigate("/post/"+data.id)} className="flex border-b-1 border-gray-100 px-7 py-4 cursor-pointer hover:bg-gray-50 duration-100 ease-in-out">
            <div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" src={getProfileImage() || "/default_profile.png"} alt="profile image" />
                </div>
            </div>
            <div className="flex-grow-1 px-4">
                <div className="space-x-1 text-gray-700">
                    <span className="text-gray-800 font-bold">{data.user_name}</span>
                    <span>·</span>
                    <span>{formatDistanceToNow(new Date(data.created_at), { addSuffix: true })}</span>
                </div>
                <div className="wrap-break-word whitespace-pre-wrap mb-2 text-gray-700">
                    {data.text}
                </div>
                <div className="flex items-start overflow-hidden max-h-[512px] h-auto">
                    <img className="max-h-[512px] rounded-xl" src={getPostImage()} alt="" />
                </div>
                <div className="flex space-x-3 pt-3">
                    <button className="flex items-center rounded-full space-x-1.5 hover:bg-sky-100 hover:text-sky-700 px-3 py-1">
                        <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                        <span>{data.comments_count}</span>
                    </button>
                    <LikeButton post={data}/>
                    
                </div>
            </div>
        </div>
    </>
}

export default Post