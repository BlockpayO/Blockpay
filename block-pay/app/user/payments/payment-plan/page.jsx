'use client'

import SideNav from "@/components/SideNav";
import { useState } from "react";

const PaymentPlanPage = () => {
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
            <div className="w-full">
            <div className="flex-row mt-5 mx-5">
                <SideNavToggle openView={openView} />
            </div>
            <div className="flex justify-center items-center px-4 py-2">
                <h1 className="text-3xl font-bold  text-center">
                    Welcome to Payment Plan Page
                </h1>
            </div>
            </div>
        </main>
    )
}

export default PaymentPlanPage

const SideNavToggle = ({openView}) => {
    return (
      <svg onClick={() => openView(true)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#080808" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
    );
  };