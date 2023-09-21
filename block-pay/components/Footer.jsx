"use client"
import { useState } from "react";
import "@/styles/globals.css";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <section className="flex flex-col justify-center w-full bg-[#f7f7f7] items-center sm:py-12 sm:px-8">
      <div className="flex flex-col sm:flex-row justify-between  p-9  w-full bg-[#f7f7f7]">
        <div className="flex flex-col sm:w-[45%] mb-5">
          <h2 className="text-xl font-semibold sm:text-4xl w-[31.25rem]">
            Feedback and suggestions <br /> are appreciated
          </h2>
          <div className="flex flex-col">
            <Form />
          </div>
        </div>
        <div className="flex flex-col justify-center sm:flex-row sm:w-[55%]">
          {footerLinks.map((footerLink) => (
            <ul key={footerLink.id} className="flex flex-row sm:flex-row mx-4 sm:mb-0">
              <li className="mb-3 flex flex-col">
                <h2 className="text-xl font-semibold sm:text-4xl">{footerLink.name}</h2>
                <p className="text-lg">
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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4 p-2 rounded-md  text-lg"
      />

      <input
        type="email"
        id="email"
        placeholder="E-mail Address"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 p-2 rounded-md text-lg"
      />

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="mb-4 p-2 rounded-md h-[120px] text-lg"
      ></textarea>

      <button
        type="submit"
        className="py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Send Message
      </button>
    </form>
  );
}
