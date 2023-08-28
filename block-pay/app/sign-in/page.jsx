"use client"

import Link from "next/link";
import { useState } from "react";
import "@/styles/globals.css"
import Image from "next/image";
import { backarrow } from "@/public/assets/images";


const SignIn = () => {
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
                {/* <div className="flex flex-row relative top-3 left-3">*/}
                    <Link href="/" className="fixed top-3 left-3 flex flex-row">
                        <Image src={backarrow} className="w-[20px] h-[20px]"/>
                        <p className="ml-1 text-color font-normal text-[13.15px]">
                                Back
                        </p>
                    </Link>
                {/*</div>*/}

                <div className="flex justify-center items-center mb-10 mx-auto">
                        <h2 className="h2 text-color  justify-center">
                            Login
                        </h2>
                </div>
                <form onSubmit={handleSubmit} className="justify-center">

                    <div className="justify-center items-center mb-[26px]">
                        <input
                        type="text"
                        placeholder="    -E-mail Or Username Or Phone Number-"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-[40px]">
                        <input
                        type="password"
                        id="password"
                        placeholder="    -Password-"
                        name="password"
                        value={name}
                        onChange={(e) => setEmail(e.target.value)}
                        required className="rounded-[12px] w-[380px] h-[35px]"/>
                    </div>

                    <div className="justify-center items-center mb-6">
                        <button type="submit" className="w-[380px] h-[40px] font-[210px] text-[18px] text-[#f7f7f7] rounded-[16px] bg-[#1856F3]">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default SignIn