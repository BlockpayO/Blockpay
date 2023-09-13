
'use client'

import SideNav from "@/components/SideNav";
import {backarrow} from "@/public/assets/images"
import Link from "next/link";
import Image from "next/image"
import { useState } from "react";

const PreviewPage = () => {
    const [view,setView] = useState(false);

    const openView = (view) => {
        setView(view);
    };
    
    const closeView = (view) => {
        setView(view);
    };


    return (
        <main className="flex justify-center h-full bg-[#1856F3]">
        <div className="flex justify-center max-h-full items-center p-12">
            <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] py-7 px-6 w-[525px]">
                <div className="grid w-full">
                    <Link href="/user/payments/payment-link" className="flex-row order-first">
                        <div className="flex justify-start cursor-pointer">
                            <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
                            <p className="ml-2 text-sm text-color">Back</p>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-medium text-color mt-[25px] mb-8 flex justify-center">
                        defamatory
                    </h2>
                </div>
                <form className="flex flex-col justify-center items-center px-10">
                <input
                type="number"
                placeholder="500 USD"
                id="payment-amount"
                name="payment-amount"
                value=""
                onChange={(e) => {
                    setPlanName(e.target.value);
                }}
                required
                className="w-[380px] mb-9 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <div className="flex flex-row justify-between w-[380px] mb-9">
                <input
                type="text"
                placeholder="John"
                id="first-name"
                name="first-name"
                value=""
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
                required
                className="w-[180px] mr-2 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <input
                type="text"
                placeholder="Doe"
                id="last-name"
                name="last-name"
                value=""
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
                required
                className="w-[180px] px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />
                </div>

                <input
                type="text"
                placeholder="Payment ID"
                id="paymentID"
                name="paymentID"
                value=""
                readOnly
                required
                className="w-[380px] mb-11 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <div className="mb-2">
                <button
                    type="submit"
                    className="w-[380px] mb-12 p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Pay
                </button>
                </div>
                </form>
            </div>
        </div>
    </main>
    );
};

export default PreviewPage