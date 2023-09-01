"use client"
import { dashboards } from "@/constants";
import { logo, transactIcon, settingsIcon, logOut, payments, homeIcon } from "@/public/assets/images";
import Image from "next/image";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

const SideNav = () => {
    const [username, setUsername]= useState('')

    const auth = getAuth(app)
    const user = auth.currentUser
    console.log(user)
    async function fetchUsername(userId) {
        const db = getFirestore(app);
        try {
          console.log("Fetching username for user ID:", userId);
      
          const userCollection = collection(db, 'users');
          const userDoc = doc(userCollection, userId); // Use the user ID as the document reference
          const userSnapshot = await getDoc(userDoc);
      
          if (userSnapshot.exists()) {
            console.log('Found user data:');
            const userData = userSnapshot.data();
            console.log(userData);
            
            const username = userData.username;
            console.log('Username:', username);
           setUsername(username)
          } else {
            console.log('No user data found for user ID:', userId);
            return null;
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          return null;
        }
      }
      
      useEffect(()=>{
        const userId = user?.uid
        console.log(user)
        console.log(userId)
         fetchUsername(userId)
        
      }, [user])
    return (
        <div className="flex flex-col bg-[#f7f7f7] relative">
            <div className="flex justify-center my-7">
                <Image src={logo} className="w-[10rem] h-[5rem] cursor-pointer" alt="Logo" />
            </div>
            <div className="flex">
                <ul className=" flex flex-col space-y-5">
                    {dashboards.map((dashboard) => (
                        <li key={dashboard.id} className="flex py-3 px-11 hover:bg-[#1856F3] hover:text-white cursor-pointer">
                            <div className="w-6 h-6 mr-2 ">
                                {dashboard.icon === transactIcon && (
                                    <Image src={transactIcon} alt="Transaction Icon" />
                                )}
                                {dashboard.icon === settingsIcon && (
                                    <Image src={settingsIcon} alt="Settings Icon" />
                                )}
                                {dashboard.icon === logOut && (
                                    <Image src={logOut} alt="Log Out Icon" />
                                )}
                                {dashboard.icon === homeIcon && (
                                    <Image src={homeIcon} alt="Home Icon"/>
                                )}
                                {dashboard.icon === payments && (
                                    <Image src={payments} alt="Payments Icon" className=""/>
                                )}
                                {/* ... repeat for other icons */}
                            </div>
                            <div className="">{dashboard.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid justify-center px=11 py-3 mt-12">
                <h1 className="text-color font-medium text-xl">
                    @{username}
                </h1>
                <p className="text-sm">
                    ID: 1234567
                </p>
            </div>
        </div>
    );
}

export default SideNav;