"use client"
import { Link as LinkIcon, LogIn, Menu, UserKey} from "lucide-react";
import Link  from "next/link";
import { useAuth } from "../context/authContext";
import SideMenu from "./SideMenu";


export default function Navbar() {
    const { user, logout, isOpen, setIsOpen } = useAuth();
    

    return <main className="w-full flex items-center justify-between">
        <Link href={"/"}>
            <div className="flex items-center justify-center gap-2">
                <LinkIcon size={40} className="text-black font-extrabold"/>
                <p className="text-black tracking-widest text-md lg:text-lg">URL & QRCODE Generator</p>
            </div>
        </Link>
        <div className="hidden md:flex items-center justify-start  gap-8">
            {user && (
                <Link href={"/qrgenerator"}>
                    <p className="cursor-pointer text-md text-black hover:scale-105 transition-all duration-300">QR Generator</p>
                </Link>
            )}
            {user ? (
                <Link href={"/profile"} className="flex items-center gap-2">
                    <UserKey size={20} className="text-green-600"/>
                    <p className="text-md text-black font-semibold">{user.name}</p>
                </Link>
            ) : 
            (
                <Link href="/auth/login" className="text-black flex items-center gap-2">
                    <LogIn className="text-black" size={20}/>
                    <p className="text-sm lg:text-lg text-black/70 hover:scale-105 transition-all duration-300">Login</p>
                </Link>
            )
            }
            {user && 
                <p
            onClick={() => logout()} 
            className="cursor-pointer text-md text-black hover:scale-105 transition-all duration-300">Logout</p>
            }
                {user &&
                (   
                    <Link href={"/userData"}>
                        <div className="bg-black py-2 px-5 hover:scale-105 transition-all duration-300">
                            <p className="text-md text-white">View Data</p>
                        </div>
                        
                    </Link>
                )
                }
        </div>


        <Menu 
        size={30} 
        className="block md:hidden text-black/80"
        onClick={()=> setIsOpen(true)}
        />

    </main>
};
