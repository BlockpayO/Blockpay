"use client"

import { useState } from "react";
import "@/styles/globals.css"

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    };

    return (
        <div className="justify-between items-center flex flex-col my-auto">
            <form onSubmit={handleSubmit} className="justify-between items-center flex flex-col">
                <input
                type="text"
                placeholder="    -Name-"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required className="mb-4 rounded-[8px] w-[520px] h-[40px]"/>

                <input
                type="email"
                id="email"
                placeholder="    -E-mail Address-"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required className="mb-4 rounded-[8px] w-[520px] h-[40px]"/>

                <input
                type="password"
                id="password"
                placeholder="    -E-mail Address-"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required className="mb-4 rounded-[8px] w-[520px] h-[40px]"/>



                <button type="submit" className="w-[520px] h-[40px] font-[210px] text-[18px] text-[#f7f7f7] rounded-[8.5px] bg-[#1856F3]">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default SignUp