"use client"

import { useState } from 'react';
import "@/styles/globals.css"

const Footer = () => {
    return (
        <section className="flex flex-col h-[330px] w-full justify-between items-center bg-[#F7F7F7] mt-[4rem]">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <h2 className="h2">
                        Feedbacks and suggestions are<br />
                        appreciated
                    </h2>
                    <div className="flex flex-col">
                        <Form/>
                    </div>
                </div>
                
                <ul /*</div>key={''}*/>
                    <li>

                    </li>
                </ul>
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
    <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required/>

        <input
        type="email"
        id="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>

        <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required>
        </textarea>

        <button type="submit" className="button w-[600px] h-[500px]">Send Message</button>
        </form>
    );
}