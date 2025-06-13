import { useNavigate } from "react-router"
import Layout from "../components/Layout"
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"
import useAuthStore from "../store/authStore"
import { useMemo } from "react"
import { format } from 'date-fns';
import ProfileTabs from '../components/ProfileTabs'
import EditProfile from "../components/EditProfile"

const ProfilePage = () => {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const formattedJoinDate = useMemo(() => {
        const date = new Date(user?.created_at || "");
        return format(date, 'MMMM yyyy');
    }, [user?.created_at]);

    const getCoverImage=()=>{
        if(user?.cover_image_url)
            return import.meta.env.VITE_UPLOADS+"/"+user?.cover_image_url
    }
    const getProfileImage=()=>{
        if(user?.profile_image_url)
            return import.meta.env.VITE_UPLOADS+"/"+user?.profile_image_url
    }

    return <>
        <Layout>
            <div className="px-2 flex items-center mb-4">
                <button className="rounded-full p-2 hover:bg-gray-200 cursor-pointer mr-8" onClick={() => navigate(-1)}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div>
                    <div className="text-xl font-bold">{user?.name}</div>
                    <div className="text-sm text-gray-600">0 posts</div>
                </div>
            </div>
            <div >
                <div className="bg-gray-400 relative">
                    <div className="pb-[33.33%]"></div>
                    <div style={{ backgroundImage: `url(${getCoverImage() || ""})` }} className="absolute inset-0 flex items-center justify-center bg-cover bg-center">
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between ">
                        <div className="mt-[-15%] w-[25%] h-auto relative rounded-full overflow-hidden border-5 border-white">
                            <div className="pb-[100%] w-full"></div>
                            <img src={getProfileImage() || "/default_profile.png"} alt="" className="absolute top-0 left-0 w-full h-full object-cover">

                            </img>
                        </div>
                        <div>
                            <EditProfile />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="text-xl font-bold">{user?.name}</div>
                        <div className="text-sm text-gray-600">{user?.email}</div>
                    </div>
                    <div className="flex items-center text-md text-gray-600 mb-4">
                        <CalendarDaysIcon className="w-5 h-5 mr-3" />
                        <span>Joined {formattedJoinDate}</span>
                    </div>
                    <div className="flex space-x-3 text-gray-500">
                        <div><span className="font-bold text-black">1</span> following</div>
                        <div><span className="font-bold text-black">0</span> followers</div>
                    </div>
                </div>

            </div>
            <div>
                <ProfileTabs />
            </div>

        </Layout>
    </>
}

export default ProfilePage