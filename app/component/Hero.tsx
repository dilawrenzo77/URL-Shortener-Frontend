"use client"
import Image from "next/image";
import Navbar from "./Navbar";
import Pic from "../../public/office.jpg";
import { Copy, Earth, FileBracesCorner, Link, LoaderCircle, PencilLine } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useState } from "react";



export default function Hero() {
    const { shortenUrl, shortUrl, loading, user } = useAuth();
    const [url, setUrl] = useState("");
    
    

    return <section id="hero" className="min-h-screen space-y-10 w-full">
        <Navbar />
        <div className="py-8 flex items-stretch justify-between gap-4">
            <div className="w-full sm:w-7/12  py-5 flex flex-col items-center sm:items-start justify-start gap-5">
                <div className="bg-green-500 w-fit px-5 py-1 lg:py-2 lg:px-6 rounded-full">
                    <p className="text-white text-xs lg:text-sm">Sign up and in to create your custom url</p>
                </div>
                <p className="text-center sm:text-start text-5xl lg:text-6xl text-black font-thin leading-10 md:leading-12 lg:leading-20">
                    URL Shortener and<br/> QR code generator
                </p>
                <p className="text-center sm:text-start text-md lg:text-lg font-light text-black/80">Explore how hundreds, thousands customize their url<br/> and create qr codes for everday businesses</p>
            </div>
            <div className="relative hidden sm:flex flex-1 overflow-hidden rounded-lg">
                <Image src={Pic} alt="heroPic" fill priority sizes="(max-width: 768px) 100vw, 42vw" className="object-cover"/>
            </div>
        </div>

        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-5 bg-amber-50 w-full rounded-md px-4 py-4 lg:py-6 lg:px-6 border-2 border-black">
            <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Link size={15} className="text-black"/>
                    <p className="text-sm lg:text-lg font-semibold text-black">FULL URL</p>
                </div>
                <input 
                onChange={(e) => setUrl(e.target.value)} 
                type="text" 
                placeholder="https://yourlongurlhere.com" 
                className="border-2 border-green-500 w-60 placeholder:text-xs lg:text-md text-black/70 px-2 py-1 lg:py-3 lg:px-4 rounded-lg"/>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Earth size={15} className="text-black"/>
                    <p className="text-sm lg:text-lg text-black font-semibold">URL GENERATED</p>
                </div>
                <div className="w-60 px-4 py-2 lg:px-5 lg:py-4 border-2 border-green-500 rounded-lg">
                    <p className="text-black/70  text-xs lg:text-md">{!shortUrl ? "waiting for url" : shortUrl}</p>
                </div>
            </div>
            {loading ?
             (
                <LoaderCircle className="text-black animate-spin" size={25}/>
             )
            :
            (
                <div 
                onClick={() => {url.length > 13 && shortenUrl(url)}}  
                className={`flex items-center gap-2 px-6 py-2 lg:px-8 lg:py-3 bg-green-500 cursor-pointer hover:scale-105 transition-all duration-300 ${url.length < 13 && `opacity-40`}`}>
                    <FileBracesCorner size={20} className="text-black"/>
                    <p className="text-black font-semibold text-sm lg:text-lg">Shorten URL</p>
                </div>
            )
            }
        </div>

    </section>
};
