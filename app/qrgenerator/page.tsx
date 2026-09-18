"use client"
import Image from "next/image"
import Navbar from "../component/Navbar"
import Pic from "@/public/noImage.jpg"
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

interface QrProps {
    url: string
    userId: string | undefined
    image: string
}

export default function page() {
    const { user } = useAuth();
    const [url, setUrl] = useState<string>(" ");
    const [image, setImage] = useState<string>(" ");
    const [qrDetails, setQrDetails] = useState<QrProps>({
        url: "",
        userId: "",
        image: ""
    })


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if(url !== " "){
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/qr/generateQRCcode`, { data: url })
                setImage(response?.data?.image)
                const newDetails = {
                    url: url,
                    userId: user?.id ?? "",
                    image: response?.data?.image ?? ""
                };  

                setQrDetails(newDetails);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {
            if(url !== " "){
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/qr/saveQrCode`, qrDetails)
                const savedData = await response?.data

                toast.success("QR code saved successfully!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <main className="bg-white min-h-screen py-2 px-15 w-full flex flex-col items-center gap-6">
        <Navbar />
        <div className="w-full flex flex-col items-center justify-start gap-5">
            <p className="text-2xl font-bold text-black/80">Generate QR-CODE </p>
            <div className="bg-gray-300 p-8 w-fit flex flex-col items-center gap-5 h-90 rounded-lg">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <Image 
                    src={image !== " " ? 
                        image :
                        Pic
                    } 
                    alt="heroPic" 
                    fill 
                    priority 
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain"/>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input type="text" 
                    placeholder="Enter your website" 
                    className="border-2 border-gray-600 w-full placeholder:text-xs text-black/70 px-5 py-2 rounded-lg" 
                    onChange={(e) => setUrl(e.target.value)}
                    />
                    {url?.length > 4 ?
                        (
                            <button 
                            className="cursor-pointer px-4 py-2 hover:scale-105 bg-green-500 transition-all duration-300 text-black text-lg font-semibold rounded-lg"
                            type="submit"
                            >
                                Generate
                            </button>
                        ) :
                        (
                            <button 
                            className="cursor-pointer px-4 py-2 bg-gray-500 text-black text-lg font-semibold rounded-lg opacity-40"
                            >
                                Generate
                            </button>
                        )

                    }
                    {image === " " ?
                        (
                            <button 
                            className="cursor-pointer px-4 py-2 bg-gray-500 text-black text-lg font-semibold rounded-lg opacity-40"
                            >
                                Save
                            </button>
                        ) :
                        (
                            <button 
                            className="cursor-pointer px-4 py-2 hover:scale-105 bg-green-500 transition-all duration-300 text-black text-lg font-semibold rounded-lg"
                            onClick={() => handleSave()}
                            >
                                Save
                            </button>
                        )

                    }
                </form>
            </div>
        </div>
    </main>
};
