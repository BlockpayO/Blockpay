"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { backarrow } from "@/public/assets/images";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

<<<<<<< HEAD
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
=======
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Link href="/sign-up">
            <div className="flex items-center cursor-pointer">
              <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
              <p className="ml-2 text-sm text-gray-600">Back</p>
>>>>>>> 280d88c5a40b76587bbf515a38b07a675c679fe4
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center text-color mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="E-mail Or Username Or Phone Number"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full py-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
