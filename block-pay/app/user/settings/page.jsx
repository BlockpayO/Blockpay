'use client'

import SideNav from "@/components/SideNav";
import { setting } from "@/constants";
import Link from "next/link";
import { useState } from "react";

const SettingsPage = () => {
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
            <div className="w-full p-12">
              <div className="flex-row mt-5 mx-5">
                <SideNavToggle openView={openView} />
              </div>
              <div className="flex-1 justify-center items-center mx-7">
                <h1 className="text-color font-semibold text-2xl text-left mb-3 ml-5">
                  Settings
                </h1>
                <div className="flex flex-col">{setting.map((settings) => (
                  <Link href="/" key={settings.head} >
                    <div className="flex flex-col bg-[#f7f7f7] w-full justify-start rounded-2xl cursor-pointer p-5 mb-5 hover:scale-[100.75%]">
                      <h2 className="text-lg font-medium">{settings.head}</h2>
                      <p className="text-xs text-[#808080]">{settings.details}</p>
                    </div>
                  </Link>
                ))}</div>
                <h2 className="flex justify-end text-lg font-medium text-blue-500 hover:text-[#1856F3] mr-2 cursor-pointer">Delete Account</h2>
              </div>
            </div>

            <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            </div>
        </main>
    )
}

export default SettingsPage

const SideNavToggle = ({openView}) => {
    return (
      <svg onClick={() => openView(true)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#080808" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
    );
  };