"use client";
import SideNav from "@/components/SideNav";
import ProviderContext from "../context/ProviderContext";

import {
  carlPfp,
  kaiyaPfp,
  chancePfp,
  cristoferPfp,
  abramPfp,
} from "@/public/assets/images";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import Transactions from "../payments/Transactions";
import connectWallet from "../connect";
import { Spinner, Flex } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const TransactionsPage = () => {
  const [view, setView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // brief illustration of how to import the provide inside a page.

  const { provider } = connectWallet();
  useEffect(() => {
    console.log("Provider", provider);
  }, []);

  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };


  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  
  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner
          size="xl"
          color="#1856f3"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </Flex>
    );
  }


  return (
    <main className="flex">
      <SideNav view={view} closeView={closeView} />
      <div className="flex-1 p-7">
        <div className="flex mt-9 mb-4 w-full justify-between">
          <SideNavToggle openView={openView} />
          <h1 className="md:text-3xl text-color font-semibold text-left mr-2 text-xl">
            Transactions
          </h1>
          {/*}
                    <select name="userBalance" className="p-1 border border-[#1856f3] rounded cursor-pointer">
                        <option value="usdc">NGN</option>
                        <option value="matic">USD</option>
                    </select>*/}
          <SearchBar />
        </div>
        <div className="p-7 border-2 border-[#bebebe] rounded-lg flex-auto h-screen">
          {provider && <Transactions />}
          {/**--==== BEFORE WALLET CONNECT ====--*/}
          {!provider && (
            <div className="sticky flex items-center justify-center mt-[12.5rem]">
              <h1 className="font-medium text-3xl text-gray-300 flex">
               Connect wallet to show transaction history
              </h1>
            </div>
          )}

          {/**<ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>
                                <div>
                                    {transaction.title}
                                </div>
                                <div>
                                {transaction.desc === [carlPfp, "Carla Herwitz"] && (
                                    <Image src={carlPfp} alt="carla" />
                                )}
                                {transaction.desc=== abramPfp && (
                                    <Image src={abramPfp} alt="abram" />
                                )}
                                
                                {dashboard.icon === logOut && (
                                    <Image src={logOut} alt="Log Out Icon" />
                                )}
                                {dashboard.icon === homeIcon && (
                                    <Image src={homeIcon} alt="Home Icon"/>
                                )}
                                {dashboard.icon === payments && (
                                    <Image src={payments} alt="Payments Icon"/>
                                )}*
                                {transaction.desc}
                                </div>
                            </li>
                        ))}
                    </ul>*/}
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;

const SideNavToggle = ({ openView }) => {
  return (
    <svg
      onClick={() => openView(true)}
      className="lg:hidden"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#080808"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
    </svg>
  );
};

const SearchBar = () => {
  return (
    <div className="flex">
      <input
        type="search"
        name="search invoice"
        id=""
        placeholder="Search"
        className="text-[13px] py-1 w-32 md:py-2 md:w-72 px-4 border border-[#bebebe] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
