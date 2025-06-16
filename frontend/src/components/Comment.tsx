import { formatDistanceToNow } from "date-fns"
import { Comment as IComment } from "../types"

interface Props {
    data: IComment
}


const Comment = ({ data }: Props) => {
    const getProfileImage = () => {
        if (data?.profile_image_url)
            return import.meta.env.VITE_UPLOADS + "/" + data?.profile_image_url
    }
    return <>
        <div className="flex border-b-1 border-gray-100 px-7 py-4 cursor-pointer hover:bg-gray-50 duration-100 ease-in-out">
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
            </div>
        </div>
    </>
}

export default Comment