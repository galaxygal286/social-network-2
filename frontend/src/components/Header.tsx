import { BellIcon, EnvelopeIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline"
import NexIcon from "./NexIcon"
import { Link, NavLink } from "react-router"

const navItems=[
    {
        name:"Home",
        path:"/home",
        icon:<HomeIcon className="w-6 h-6"/>
    },
    {
        name:"Explore",
        path:"/explore",
        icon:<MagnifyingGlassIcon className="w-6 h-6"/>
    },
    {
        name:"Notifications",
        path:"/notifications",
        icon:<BellIcon className="w-6 h-6"/>
    },
    {
        name:"Messages",
        path:"/messages",
        icon:<EnvelopeIcon className="w-6 h-6"/>
    },
    {
        name:"Profile",
        path:"/profile",
        icon:<UserIcon className="w-6 h-6"/>
    }
]

const activeLink=({ isActive }:any) =>
[
  isActive ? "bg-gray-200" : "",
  "px-4 py-3 duration-100 ease-in-out flex itens-center hover:bg-gray-200 rounded-full"
].join(" ")

const Header=()=>{
    return <>
        <header className="w-full flex flex-col space-between h-full">
            <div>
                <Link to="/home" className="block px-4">
                    <NexIcon className="w-20 h-20"/>
                </Link>
                <nav className="flex flex-col text-xl">
                    {navItems.map((item)=>(
                        <div key={item.path} className="py-1 flex">
                            <NavLink className={activeLink} to={item.path}>
                                <div className="flex items-center">
                                    {item.icon}
                                </div>
                                <div className="px-3">
                                    {item.name}
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </nav>
            </div>
            <div>

            </div>
        </header>
    </>
}

export default Header