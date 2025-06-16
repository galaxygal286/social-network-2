import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import RichTextInput from './RichTextInput'
import { useRef, useState } from "react"
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"

interface Props{
    post_id:number
}

const CreateComment = ({post_id}:Props) => {
    const { user } = useAuthStore()
    const { createComment } = usePostStore()
    const [text, setText] = useState('')

    const handleTextChange = (text: string) => {
        setText(text)
    }

    const handleCreatePost = async () => {
        await createComment(post_id,text)
        clearForm()
    }

    const clearForm = () => {
        setText('')
    }

    const getProfileImage = () => {
        if (user?.profile_image_url)
            return import.meta.env.VITE_UPLOADS + "/" + user?.profile_image_url
    }

    return <>
        <div className="flex px-7">
            <div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" src={getProfileImage() || "/default_profile.png"} alt="" />
                </div>
            </div>
            <div className="flex-grow-1 px-4">
                <div className="py-3">
                    <RichTextInput placeholder="Post your reply" onTextChange={handleTextChange} />
                </div>
                <div className="flex justify-end items-center border-gray-100  py-3">
                    <button onClick={handleCreatePost} disabled={text.length === 0} className="text-center rounded-full bg-dark px-4.5 py-1.5 font-semibold text-white shadow-xs hover:bg-dark-hover cursor-pointer disabled:bg-dark-disabled">Post</button>
                </div>
            </div>
        </div>
    </>
}

export default CreateComment