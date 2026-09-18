"use client"
import Link from "next/link";
import { CircleX, Link as LinkIcon, LogIn, LogOut, UserKey } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function SideMenu() {
    const { user, logout, setIsOpen, isOpen } = useAuth();

    return (
        <>
            {/* Backdrop: dark blur layer underneath */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 h-screen bg-black/40 backdrop-blur-sm transition-opacity ease-out
                    ${isOpen
                        ? "opacity-100 duration-300 delay-0 pointer-events-auto"
                        : "opacity-0 duration-200 delay-200 pointer-events-none"
                    }`}
            />

            {/* Side panel */}
            {/* Side panel — slides in after backdrop */}
            <div
                className={`fixed top-0 right-0 z-50 border-l-2 border-green-600 flex flex-col items-start gap-10 bg-gray-200 w-3/4 md:w-1/3 lg:w-1/4 h-screen px-8 py-8
                    transition-transform ease-out
                    ${isOpen
                        ? "translate-x-0 duration-300 delay-200"
                        : "translate-x-full duration-300 delay-0"
                    }`}
            >
                <div>
                    <Link href={"/"}>
                        <div className="flex items-center justify-center gap-2">
                            <LinkIcon size={40} className="text-black font-extrabold" />
                        </div>
                    </Link>
                </div>

                <div className="flex flex-col items-center justify-center gap-8 ">
                    {user && (
                        <Link href={"/qrgenerator"}>
                            <p className="cursor-pointer text-lg text-black hover:scale-105 transition-all duration-300">
                                QR Generator
                            </p>
                        </Link>
                    )}

                    {user ? (
                        <Link href={"/profile"} className="flex items-center gap-2">
                            <UserKey size={20} className="text-green-600" />
                            <p className="text-lg text-black font-semibold">{user.name}</p>
                        </Link>
                    ) : (
                        <Link href="/auth/login" className="text-black flex items-center gap-2">
                            <LogIn className="text-black" size={20} />
                            <p className="text-lg text-black/70 hover:scale-105 transition-all duration-300">
                                Login
                            </p>
                        </Link>
                    )}

                    {user && (
                        <p
                            onClick={() => logout()}
                            className="cursor-pointer text-sm text-black hover:scale-105 transition-all duration-300"
                        >
                            Logout
                        </p>
                    )}

                    {user && (
                        <Link href={"/userData"}>
                            <div className="bg-black py-2 px-5 hover:scale-105 transition-all duration-300">
                                <p className="text-md text-white">View Data</p>
                            </div>
                        </Link>
                    )}
                </div>



                {user && (
                    <div 
                        onClick={() => logout()}
                        className="mt-8 flex items-center gap-2 ">
                            <LogOut size={20} className="text-red-400"/>
                            <p className="text-lg text-black font-semibold">LOGOUT</p>
                    </div>
                )}

                <CircleX
                    onClick={() => setIsOpen(false)}
                    size={40}
                    className="absolute top-5 right-5 text-black cursor-pointer"
                />
            </div>
        </>
    );
}