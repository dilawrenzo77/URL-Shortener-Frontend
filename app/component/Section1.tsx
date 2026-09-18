import Image from "next/image";
import Pic2 from "../../public/heroImage.jpg"
import Link from "next/link";

export default function Section1() {
    return <main className="bg-gray-200 py-10 flex items-center justify-center border-2 border-black w-full">
        <div className="flex flex-col items-center md:flex-row md:items-stretch justify-between gap-8 w-full px-4">
            <div className="relative w-full h-64 sm:h-80 md:h-auto md:flex-1 overflow-hidden rounded-lg">
                <Image
                    src={Pic2}
                    alt="heroPic"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 py-5 flex flex-col items-center md:items-start justify-start gap-5">
                <p className="text-center md:text-start text-4xl text-black font-semibold leading-10">
                    Shorten your URL<br/> Your way
                </p>
                <p className="text-center md:text-start text-md font-light text-black/80">
                    Explore how hundreds, thousands customize <br/>their url and create qr codes for <br/>everday businesses
                </p>
                <a href="#hero" className="bg-black py-2 px-5 hover:scale-105 transition-all duration-300">
                    <p className="text-md text-white">Get Started</p>
                </a>
            </div>
        </div>
    </main>
};