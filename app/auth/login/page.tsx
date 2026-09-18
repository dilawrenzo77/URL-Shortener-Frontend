import AuthForm from "@/app/component/AuthForm";
import Navbar from "@/app/component/Navbar";

export default function login() {
    return <main className="bg-white min-h-screen py-2 px-15 w-full flex flex-col items-center gap-6 lg:gap-12">
        <Navbar />
        <AuthForm auth="login"/>
    </main>
};
