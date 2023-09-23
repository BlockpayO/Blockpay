'use client'

import SideNav from "@/components/SideNav";
import Image from "next/image";
import { paymentCards } from "@/constants";
import Link from "next/link";
import { useState } from "react";

const PaymentsPage = () => {
    const [view,setView] = useState(false);

    const openView = (view) => {
        setView(view);
      };
    
      const closeView = (view) => {
        setView(view);
      };


    return (
        <main className="flex">
            <SideNav view={view} closeView={closeView}/>
            <div className="w-full flex flex-col justify-center">
            <div className="flex-row mt-5 mx-5">
                <SideNavToggle openView={openView} />
            </div>
            <div className="flex justify-center items-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 p-7 lg:grid-cols-3 md:justify-between justify-center items-center w-full">
                        {paymentCards.map((paymentCard) => (
                            <Link key={paymentCard.id} 
                                href={`/user/payments/${paymentCard.id}`}
                                className="flex flex-col p-5 rounded-3xl mb-5 mx-5 items-center bg-[#f7f7f7] cursor-pointer hover:scale-105">
                                <div className="w-24 h-24 p-4">
                                    <Image src={paymentCard.img} alt={paymentCard.id}/>
                                </div>
                                <div className="flex-col text-center p-2 mb-4">
                                    <h2 className="text-color font-medium text-xl mb-4">{paymentCard.title}</h2>
                                    <p className="font-normal text-sm">{paymentCard.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
            </div>
            </div>
        </main>
    )
}

export default PaymentsPage


const SideNavToggle = ({openView}) => {
    return (
      <svg onClick={() => openView(true)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#080808" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
    );
  };