import { Link } from "react-router"
import NexIcon from "../components/NexIcon"

const StartPage=()=>{
    return <>
        <div className="min-h-screen flex">
            <div className="flex flex-1 items-center justify-center px-7 max-lg:hidden">
                <NexIcon className="w-full h-full max-w-100"/>
            </div>
            <div className="flex items-center justify-center min-w-[45%] max-lg:min-w-full">
                <div className="w-[760px] mx-auto px-5">
                    <div className="hidden max-lg:block mb-2">
                        <NexIcon className="w-30 h-30"/>
                    </div>
                    <p className="text-7xl font-bold mb-15">It's what's happening.</p>
                    <p className="text-5xl font-bold mb-15">Join Today</p>
                    <Link 
                        to="/register"
                        className="text-center block w-full max-w-80 rounded-full bg-sky-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-sky-500 cursor-pointer mb-15">
                        Create account
                    </Link>
                    <p 
                        className="font-bold mb-5">
                            Already have an account?
                    </p>
                    <Link
                        to="/login"
                        className="text-center block w-full max-w-80 rounded-full bg-white px-3 py-1.5 font-semibold text-sky-600 shadow-xs hover:bg-sky-50 cursor-pointer mb-5 outline outline-gray-300 outline-offset-[-1px]">
                            Sign in
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default StartPage