"use client"
import {QrCode} from "lucide-react"
import Link from "next/link"
import { useAuth } from "../context/authContext"

export default function Section2() {
    const { user } = useAuth();
    return <main className="bg-gray-200 min-h-screen flex items-center justify-start px-5 bg-[url('/qr.jpg')] bg-cover bg-center bg-no-repeat w-full">
        <div className="bg-black/15 backdrop-blur-2xl flex items-center justify-between gap-8 w-fit px-4">
            <div className="py-10 px-5 flex flex-col items-start justify-start gap-5">
                <p className="text-4xl text-white font-semibold leading-10">
                    Generate your QR Code<br/> Your way
                </p>
                <p className="text-md font-light text-white">Explore how hundreds, thousands customize <br/>their url and create qr codes for <br/>everday businesses</p>
                <Link href={user ? "/qrgenerator" : "auth/login"} className="flex items-center gap-2 bg-black py-2 px-5 hover:scale-105 transition-all duration-300">
                    <QrCode size={25}/>
                    <p className="text-md text-white">Generate QR code</p>
                </Link>
            </div>
        </div>
    </main>
};