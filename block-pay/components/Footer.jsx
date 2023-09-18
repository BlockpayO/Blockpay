"use client"
import { useState } from "react";
import "@/styles/globals.css";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <section className="flex flex-col w-full justify-between items-center bg-[#F7F7F7] py-5 px-4 sm:py-12 sm:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col mb-8 sm:w-[45%]">
          <h2 className="text-3xl sm:text-4xl mb-5">
            Feedback and suggestions are appreciated
          </h2>
          <div className="flex flex-col">
            <Form />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:w-[55%]">
          {footerLinks.map((footerLink) => (
            <ul key={footerLink.id} className="flex flex-col mx-4 mb-4 sm:mb-0">
              <li className="mb-3">
                <h2 className="text-3xl sm:text-4xl">{footerLink.name}</h2>
                <p className="text-base">
                  {footerLink.desc1}
                  <br />
                  {footerLink.desc2}
                </p>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-screen-lg mx-auto">
      <input
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4 p-3 rounded-md w-full text-lg"
      />

      <input
        type="email"
        id="email"
        placeholder="E-mail Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 p-3 rounded-md w-full text-lg"
      />

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="mb-4 p-3 rounded-md w-full h-[150px] text-lg"
      ></textarea>

      <button
        type="submit"
        className="w-full py-3 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Send Message
      </button>
    </form>
  );
}
