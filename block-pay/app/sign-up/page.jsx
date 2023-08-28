"use client"

import Link from "next/link";
import { useState } from "react";
import "@/styles/globals.css"
import Image from "next/image";
import { backarrow } from "@/public/assets/images";


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    };

    return (
        <div className="justify-between items-center flex flex-col ">
            <div className="flex flex-col w-[500px] h-[550px] bg-[#f7f7f7] justify-center my-auto items-center rounded-[25px]">

                <div className="flex justify-center items-center mb-10 mx-auto">
                        <h2 className="h2 text-color  justify-center">
                            Sign Up
                        </h2>
                </div>
                <form onSubmit={handleSubmit} className="justify-center">

                    <div className="justify-center items-center mb-[26px]">
                        <input
                        type="text"
                        placeholder="    -Name-"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-[26px]">
                        <input
                        type="email"
                        id="email"
                        placeholder="    -E-mail Address-"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-[26px]">
                        <input
                        type="password"
                        id="password"
                        placeholder="    -Create Password-"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-[40px]">
                        <input
                        type="password"
                        id="password"
                        placeholder="    -Confirm Password-"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-6">
                        <button type="submit" className="w-[380px] h-[40px] font-[210px] text-[18px] text-[#f7f7f7] rounded-[16px] bg-[#1856F3]">
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="font-normal text-[14px]">
                Have an Account already? <span className="text-color">
                    <Link href="/sign-in">
                        <button type="button">Login</button>
                    </Link>
                </span>
                </p>
            </div>
            
        </div>
    );
}

export default SignUp