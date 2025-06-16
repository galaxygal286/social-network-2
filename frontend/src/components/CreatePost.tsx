import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import RichTextInput from './RichTextInput'
import { useRef, useState } from "react"
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"

const CreatePost = () => {
    const { user } = useAuthStore()
    const { createPost } = usePostStore()
    const [text, setText] = useState('')

    const postImageRef = useRef<HTMLInputElement | null>(null);

    const [postImage, setPostImage] = useState<File | null>(null);

    const [postImagePreviewUrl, setPostImagePreviewUrl] = useState<string | null>(null);

    const textRef = useRef<HTMLDivElement | null>(null);

    const handleTextChange = (text: string) => {
        setText(text)
    }

    const handleCreatePost = async () => {
        await createPost({
            text,
            post_image: postImage
        })
        clearForm()
    }

    const clearForm = () => {
        setText('')
        if (textRef.current) textRef.current.innerText = '';
        handleRemoveImage()
    }

    const getProfileImage = () => {
        if (user?.profile_image_url)
            return import.meta.env.VITE_UPLOADS + "/" + user?.profile_image_url
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (postImagePreviewUrl) URL.revokeObjectURL(postImagePreviewUrl);

            setPostImage(file)
            setPostImagePreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleRemoveImage = () => {
        setPostImage(null)
        if (postImagePreviewUrl) URL.revokeObjectURL(postImagePreviewUrl);
        setPostImagePreviewUrl(null)
        if (postImageRef.current) postImageRef.current.value = ''
    }

    return <>
        <input
            type="file"
            name="profile_image"
            accept="image/*"
            ref={postImageRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
        />
        <div className="flex px-7">
            <div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" src={getProfileImage() || "/default_profile.png"} alt="" />
                </div>
            </div>
            <div className="flex-grow-1 px-4">
                <div className="py-3">
                    <RichTextInput ref={textRef} onTextChange={handleTextChange} />
                </div>
                {postImagePreviewUrl && <div className="relative">
                    <button onClick={handleRemoveImage} className="text-white p-2 rounded-full bg-black/50 absolute right-2 top-2">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <img className="rounded-xl shadow-lg" src={postImagePreviewUrl || ''} />
                </div>}
                <div className="flex justify-between items-center border-t-1 border-gray-100  py-3">
                    <button onClick={() => postImageRef.current?.click()} className="text-primary rounded-full hover:bg-sky-50 cursor-pointer p-3">
                        <PhotoIcon className="w-5 h-5 " />
                    </button>
                    <button onClick={handleCreatePost} disabled={text.length === 0} className="text-center rounded-full bg-dark px-4.5 py-1.5 font-semibold text-white shadow-xs hover:bg-dark-hover cursor-pointer disabled:bg-dark-disabled">Post</button>
                </div>
            </div>
        </div>
    </>
}

export default CreatePost