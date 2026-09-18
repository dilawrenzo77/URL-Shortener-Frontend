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
        <div className=" w-full flex items-center justify-between p-5 gap-5">
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="bg-gray-300 w-full flex flex-col items-center gap-8 p-5">
                    <p className="text-lg text-black font-semibold">URL DATA</p>

                    <div className="flex flex-col items-start gap-5 w-full bg-white p-4 rounded-lg">
                        {Url?.map((data) => (
                            <div
                                key={data.id}
                                className="p-5 border-2 border-black rounded-lg flex flex-wrap items-center justify-between w-full gap-4"
                            >
                                <div className="flex flex-col items-start gap-2 min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-black">URL</p>
                                <p className="text-xs truncate font-semibold text-black/70 w-full">
                                    {data?.originalUrl ? data.originalUrl : "No URL yet"}
                                </p>
                                </div>

                                <div className="flex flex-col items-start gap-2 min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-black">SHORTENED_URL</p>
                                <p
                                    className="text-xs text-green-700 cursor-pointer truncate w-full"
                                    onClick={() => {
                                    if (data?.shortUrl && data?.originalUrl) {
                                        window.open(
                                        data?.originalUrl?.startsWith("http")
                                            ? data?.originalUrl
                                            : `https://${data?.originalUrl}`,
                                        "_blank"
                                        );
                                    }
                                    }}
                                >
                                    {data?.shortUrl ? `www.short_url.xyz/${data.shortUrl}` : "No URL yet"}
                                </p>
                                </div>

                                <div className="hidden sm:flex flex-col items-start gap-2 min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-black">DATE</p>
                                    <p className="text-xs font-semibold text-black/70 w-full truncate">
                                        {data?.createdAt
                                        ? new Date(data?.createdAt).toLocaleDateString()
                                        : "—"}
                                    </p>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>


                <div className="bg-gray-300 grow w-full flex flex-col items-start gap-8 p-5">
                    <p className="text-lg text-black font-semibold">QRCODE DATA</p>

                    <div className="flex flex-col items-start gap-5 w-full bg-white p-4 rounded-lg">
                        {Qr?.map((data) => (
                            <div
                            key={data.id}
                            className="p-5 border-2 border-black rounded-lg flex items-start justify-between w-full gap-4"
                            >
                            {/* URL column — min-w-0 lets it shrink, flex-1 gives it bounded width */}
                            <div className="flex-1 min-w-0 flex flex-col items-start gap-2">
                                <p className="text-sm font-semibold text-black">URL</p>
                                <p className="text-xs truncate font-semibold text-black/70 w-full">
                                {data?.url ? data.url : "No URL yet"}
                                </p>
                            </div>

                            {/* Image — shrink-0 so it never gets squished by a long URL */}
                            <div className="relative w-25 h-25 md:w-33 md:h-33 shrink-0">
                                <Image
                                src={data?.image !== " " ? data.image : Pic}
                                alt="heroPic"
                                fill
                                priority
                                sizes="(max-width: 768px) 256px, 320px"
                                className="object-contain"
                                />
                            </div>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
        </div>
    </main>
};


