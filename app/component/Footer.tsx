import { Link, MonitorCog } from "lucide-react";

export default function Footer() {
    return <main className="w-full">
        <div className="flex items-center justify-between w-full pb-2 flex-wrap">
            <div className="flex items-center justify-center gap-2">
                <Link size={15} className="text-black font-extrabold"/>
                <p className="text-black/70 text-xs md:text-sm lg:text-md">URL & QRCODE Generator</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <MonitorCog size={20} className="text-black font-extrabold"/>
                <p className="text-black/70 text-xs md:text-sm lg:text-md">Developed by Mbata Lawrence</p>
            </div>
            <p className="text-black/70 text-xs md:text-sm lg:text-md">All rights reserved</p>
        </div>
    </main>
};