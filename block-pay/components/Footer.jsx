"use client"
import { useState } from 'react';
import "@/styles/globals.css";
import { footerLinks } from '@/constants';

const Footer = () => {
    return (
      <section className="bg-[#F7F7F7] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col mb-8 md:mb-0 md:mr-12">
              <h2 className="text-xl md:text-2xl mb-4">
                Feedbacks and suggestions are<br />
                appreciated
              </h2>
              <Form />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {footerLinks.map((footerLink) => (
                <div key={footerLink.id} className="flex flex-col">
                  <h2 className="text-xl md:text-2xl mb-2">{footerLink.name}</h2>
                  <p className="text-sm md:text-base">
                    {footerLink.desc1} {footerLink.desc2}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

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
        required
        className="mb-4 rounded-md w-full h-10 px-3"
      />

      <input
        type="email"
        id="email"
        placeholder="E-mail Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 rounded-md w-full h-10 px-3"
      />

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="mb-4 rounded-md w-full h-20 resize-none px-3"
      ></textarea>

      <button
        type="submit"
        className="w-full h-10 text-base text-white bg-blue-500 rounded-md"
      >
        Send Message
      </button>
    </form>
  );
}
