"use client"
import { useState } from 'react';
import "@/styles/globals.css";
import { footerLinks } from '@/constants';

const Footer = () => {
    return (
        <section className="flex flex-col h-[450px] w-full justify-between items-center bg-[#F7F7F7] mt-[4rem]">
            <div className="flex flex-row my-auto mx-auto justify-between">
                <div className="flex flex-col mb-5">
                    <h2 className="h2 mb-5">
                        Feedbacks and suggestions are<br />
                        appreciated
                    </h2>
                    <div className="flex flex-col">
                        <Form/>
                    </div>
                </div>
                <div className="flex flex-row">
                    {footerLinks.map((footerLink) => (
                        <ul key={footerLink.id} className="flex flex-row">
                            <li className="flex flex-col">
                                <h2 className="h2">
                                    {footerLink.name}
                                </h2>
                                <p className="text-[1rem] flex-col">
                                    {footerLink.desc1}
                                    {footerLink.desc2}
                                </p>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        
        </section>
    )
}

export default Footer;

function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col">
        <input
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required className="mb-4 rounded-[8px] w-[520px] h-[40px]"/>

        <input
        type="email"
        id="email"
        placeholder="E-mail Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required className="mb-4 rounded-[8px] w-[520px] h-[40px]"/>

        <textarea
            id="message"
            name="message"
            placeholder="    -Message-"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required className="mb-4 rounded-[8px] w-[520px] h-[85px] resize-none">
        </textarea>

        <button type="submit" className="w-[520px] h-[40px] font-[210px] text-[18px] text-[#f7f7f7] rounded-[8.5px] bg-[#1856F3]">
            Send Message
        </button>
        </form>
    );
}
