"use client"

import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

interface SignInProps {
    name: string
    email: string
    password: string
}

interface LoginProps {
    email: string
    password: string
}

export default function AuthForm({auth} : {auth: string}) {
    const { login } = useAuth();
    const router = useRouter();

    const [signInValues, setSignInValues] = useState<SignInProps>({
        name: "",
        email: "",
        password: "" 
    })

    const [loginValues, setLoginValues] = useState<LoginProps>({
        email: "",
        password: "" 
    })

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        let loginResponse;
        let signinResponse;

        try {
            {auth === "login" 
                ? loginResponse = await axios.post(`/api/backend/auth/login`,loginValues)
                : signinResponse = await axios.post(`/api/backend/auth/register`,signInValues);
            }

            if(loginResponse?.data.Ok){
                console.log(loginResponse.data, "LOGGGGGED");
                login(loginResponse.data.user);  // update context
                router.push("/");
            }else {
                alert("Invalid credentials");
            }    

            
        } catch (error) {
            
        }
    }


    return <div className="bg-gray-200 w-fit px-10 py-4 rounded-lg flex flex-col items-center gap-5 border-2 border-green-300">
            <div className="flex items-center justify-center gap-2">
                <LinkIcon size={40} className="text-black font-extrabold"/>
                <p className="text-black tracking-widest">URL & QRCODE Generator</p>
            </div>


            {auth === "login" ? <p className="text-xs text-black/60">Log into your account</p> : <p className="text-xs text-black/60">Create an acount</p>}

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
                {auth === "signup" && (
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-black/80 text-sm font-semibold">Name:</p>
                        <input type="text" 
                            placeholder="enter your email" 
                            className="border-2 border-gray-600 w-full placeholder:text-xs text-black/70 px-5 py-2 rounded-lg" 
                            onChange={(e) => setSignInValues(prev => ({...prev, name: e.target.value}))}/>
                    </div>
                )}

                <div className="flex flex-col items-start gap-2">
                    <p className="text-black/80 text-sm font-semibold">Email:</p>
                    <input 
                        type="text" 
                        placeholder="enter your email" 
                        className="border-2 border-gray-600 w-full placeholder:text-xs text-black/70 px-5 py-2 rounded-lg" 
                        onChange={
                            auth === "login" 
                                ? (e) => setLoginValues(prev => ({ ...prev, email: e.target.value }))
                                : (e) => setSignInValues(prev => ({ ...prev, email: e.target.value }))}
                        />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <p className="text-black/80 text-sm font-semibold">Password:</p>
                    <input 
                    type="password" 
                    placeholder="* * * *" 
                    className="border-2 border-gray-600 w-full placeholder:text-xs text-black/70 px-5 py-2 rounded-lg"
                    onChange={auth === "login"
                        ? (e) => setLoginValues(prev => ({...prev, password: e.target.value}))
                        : (e) => setSignInValues(prev => ({...prev, password: e.target.value}))
                    }
                    />
                </div>

                <button type="submit" className="bg-green-400 w-full flex items-center justify-center py-2 rounded-lg font-smeibold text-black hover:scale-105 transition-all duration-300">{auth === "login" ? "LOGIN" : "SIGN UP"}</button>
            </form>

            {auth === "login" ?
                <Link href={"/auth/signup"}>
                    <p className="text-xs text-black/80">Don&apos;t have an account? <span className="text-green-500 hover:text-green-300 cursor-pointer" >Register</span></p>
                </Link> :
                <Link href={"/auth/login"}>
                    <p className="text-xs text-black/80">Already have an account? <span className="text-green-500 hover:text-green-300 cursor-pointer">Log in</span></p>
                </Link>
            }
        </div>
};
