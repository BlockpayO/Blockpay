'use client'

import { SideNav } from "@/components"
import { useState } from "react";

const GenPaymentLink = () => {
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
            <div className="flex justify-center items-center p-12">
                <div className="grid justify-center items-center bg-[#f7f7f7] p-7">
                    <form className="space-y-2">
                        <input
                            type="text"
                            placeholder="Payment Name"
                            id="payment-name"
                            name="payment-name"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300 mr-2"
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            id="description"
                            name="description"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300 mr-2"
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            id="amount"
                            name="amount"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300 mr-2"
                        />

                        <input
                            type="number"
                            placeholder="Payment ID"
                            id="paymentID"
                            name="paymentID"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                        />

                        <div className="mb-6">
                            <button type="submit" className="p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600">
                                Create Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </main>
    )
}

export default GenPaymentLink

const SideNavToggle = ({openView}) => {
    return (
      <svg onClick={() => openView(true)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#080808" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
    );
  };