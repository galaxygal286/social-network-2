import { Dialog, DialogTitle } from "@headlessui/react"
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Form, Formik } from "formik"
import { useId, useRef, useState } from "react"
import * as Yup from 'yup';
import Input from "./Input";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";
import Alert from "./Alert";

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    bio: Yup.string()
});

const EditProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { error, clearError, updateProfile } = useUserStore()
    const { user } = useAuthStore()
    const profileImageRef = useRef<HTMLInputElement | null>(null);
    const coverImageRef = useRef<HTMLInputElement | null>(null);

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState<string | null>(null);
    const [coverImagePreviewUrl, setCoverImagePreviewUrl] = useState<string | null>(null);

    const formId=useId()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (event.target.name === "profile_image") {
                if (profileImagePreviewUrl) URL.revokeObjectURL(profileImagePreviewUrl);

                setProfileImage(file)
                setProfileImagePreviewUrl(URL.createObjectURL(file))
            }
            else if (event.target.name === "cover_image") {
                if (coverImagePreviewUrl) URL.revokeObjectURL(coverImagePreviewUrl);

                setCoverImage(file)
                setCoverImagePreviewUrl(URL.createObjectURL(file))
            }
        }
    }

    const getCoverImage=()=>{
        if(coverImagePreviewUrl)
            return coverImagePreviewUrl
        if(user?.cover_image_url)
            return import.meta.env.VITE_UPLOADS+"/"+user?.cover_image_url
    }
    const getProfileImage=()=>{
        if(profileImagePreviewUrl)
            return profileImagePreviewUrl
        if(user?.profile_image_url)
            return import.meta.env.VITE_UPLOADS+"/"+user?.profile_image_url
    }
    const clear=()=>{
        setProfileImage(null)
        setCoverImage(null)
        setProfileImagePreviewUrl(null)
        setCoverImagePreviewUrl(null)
    }

    return <>
        <button onClick={() => setIsOpen(true)} className="bg-white font-bold rounded-full px-4 py-1.5 outline outline-gray-300 outline-offset-[-1px] hover:bg-gray-100 cursor-pointer">Edit profile</button>
        <Dialog open={isOpen} onClose={() => {setIsOpen(false);}} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40 ">
                <div className="max-w-[600px] max-h-[650px] border border-gray-100 rounded-xl bg-white w-full flex flex-col overflow-hidden">
                    <DialogTitle className="font-bold sticky top-0 p-4 flex justify-between items-center">
                        <div className="flex space-x-2 items-center">
                            <button type="button" className="rounded-full p-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setIsOpen(false);clear();}}>
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                            <span className="font-bold text-xl">Edit profile</span>
                        </div>
                        <button type="submit" form={formId} className="text-center rounded-full bg-dark px-4.5 py-1.5 font-semibold text-white shadow-xs hover:bg-dark-hover cursor-pointer disabled:bg-dark-disabled">
                            Save
                        </button>
                    </DialogTitle>


                    <input
                        type="file"
                        name="profile_image"
                        accept="image/*"
                        ref={profileImageRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <input
                        type="file"
                        name="cover_image"
                        accept="image/*"
                        ref={coverImageRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div className="overflow-auto">
                        <div>
                            <div className="bg-gray-400 relative">
                                <div className="pb-[33.33%]"></div>
                                <div style={{ backgroundImage: `url(${getCoverImage() || ""})` }} className="absolute inset-0 flex items-center justify-center bg-cover bg-center">
                                    <button onClick={() => coverImageRef.current?.click()} className="rounded-full p-2.5 bg-black/50 text-white">
                                        <CameraIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between ">
                                    <div className="mt-[-12%] w-[20%] h-auto relative rounded-full overflow-hidden border-5 border-white">
                                        <div className="pb-[100%] w-full"></div>
                                        <img src={getProfileImage() || "/default_profile.png"} alt="" className="absolute top-0 left-0 w-full h-full object-cover object-center">

                                        </img>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button onClick={() => profileImageRef.current?.click()} className="rounded-full p-2.5 bg-black/50 text-white">
                                                <CameraIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>

                            </div>
                            <Formik
                                initialValues={{
                                    name: user?.name || '',
                                    bio: user?.bio || '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    await updateProfile({
                                        name: values.name,
                                        bio: values.bio,
                                        profile_image: profileImage,
                                        cover_image: coverImage
                                    })
                                    setIsOpen(false)
                                }}
                            >

                                <div>

                                    <Form id={formId} className="mt-8 space-y-5 p-4" >
                                        <Input
                                            name="name"
                                            type="name"
                                            label="Name"
                                        />
                                        <Input
                                            name="bio"
                                            type="text"
                                            label="Bio"
                                        />

                                        {/* <button
                                            className="block w-full rounded bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-blue-500 cursor-pointer"
                                            type="submit"
                                        >
                                            Save
                                        </button> */}
                                    </Form>

                                    {error && (
                                        <div className="px-4">
                                            <Alert
                                                type="error"
                                                message={error}
                                                onClose={clearError}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </>
}

export default EditProfile