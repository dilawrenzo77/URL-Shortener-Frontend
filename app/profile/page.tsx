"use client"
import { UserShield } from "lucide-react";
import Navbar from "../component/Navbar";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pic from "@/public/noImage.jpg"

type QrCode = {
  id: string;
  url: string;
  userId: string;
  image: string;
  createdAt: string;
};

type Url = {
  id: string;
  originalUrl?: string;   // 👈 add these
  shortUrl?: string;
  userId: string;
  createdAt: string;
  // add whatever other fields a URL has
};

type Analytics = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  qr: QrCode[];
  url: Url[];
};

export default function page() {
    const {user, userAnalytics} = useAuth();
    const [analyticsData, setAnalyticsData] = useState<Analytics | undefined>();
    // const analytics  = userAnalytics(user?.id as string);

    useEffect(() => {
        if (!user?.id) return;

        const fetchAnalytics = async () => {
            const analytics = await userAnalytics(user.id as string);
            setAnalyticsData(analytics);
            // console.log(analyticsData);
        };

        fetchAnalytics();
    }, [user?.id]);

    

    const Url = analyticsData?.url;
    const Qr = analyticsData?.qr;
    

    return <main className="bg-white min-h-screen py-2 px-15 w-full flex flex-col items-center gap-6">
        <Navbar />
        <div className=" w-full  flex items-start justify-between p-5 gap-3">
            <div className="bg-gray-200 w-full px-5 py-4 flex flex-col items-center gap-5 rounded-md">
                <div className="w-fit p-4 border-2 border-black rounded-full">
                    <UserShield className="text-black" size={40}/>
                </div>
                
                <div className="flex flex-col items-center gap-3 w-full">
                    <p className="text-2xl text-black font-semibold">USER DETAILS</p>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs text-black">Name:</p>
                        <p className="text-md text-black/80 font-semibold">{user?.name}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs text-black">Email:</p>
                        <p className="text-md text-black/80 font-semibold">{user?.email}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs text-black">Joined:</p>
                        <p className="text-md text-black/80 font-semibold">{user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center  gap-2 w-full">
                    <p className="text-2xl text-black font-semibold">ANALYTICS</p>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-xs text-black">No. of sites: </p>
                            <p className="text-md text-black font-semibold">{analyticsData?.url?.length}</p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-xs text-black">No. of QRCODES:</p>
                            <p className="text-md text-black font-semibold">{analyticsData?.qr?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
};


