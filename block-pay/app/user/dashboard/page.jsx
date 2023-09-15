"use client";
import SideNav from "@/components/SideNav";
import Image from "next/image";
import {
  viewBalance,
  periodIcon,
  convertIcon,
  notiIcon,
} from "@/public/assets/images";
import { dashData, rates } from "@/constants";
import { useState, useEffect, useContext } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import ProviderContext from "../context/ProviderContext";
import { ethers } from "ethers";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import connectWallet from "../connect";
import useContract from "../useContract";
import { Spinner, Flex } from "@chakra-ui/react";
import Link from "next/link";
import useBlockpayTxs from "../useBlockpayTxs";

const Dashboard = () => {
  const [view, setView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
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

  const { provider, wallet, connecting, connect, disconnect } = connectWallet();

  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };
  const { contract } = useContract();
  const { txs } = useBlockpayTxs();
  useEffect(() => {
    console.log("Effective!!");
    console.log(txs);
  }, []);

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
      {/**-------======== BEFORE CONNECTING WALLET =======------ */}

      {!connect ? (
        <>
          <SideNav view={view} closeView={closeView} />
          <div className="flex-1 p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-row justify-between md:order-last">
                <SideNavToggle openView={openView} />
                <div className="flex self-end order-last">
                  <Image
                    src={notiIcon}
                    alt="Noti Icon"
                    className="w-7 h-7 p-1 pb-0 cursor-pointer"
                  />
                  <button
                    className={`border border-gray-200 px-4 py-2 rounded-md text-gray-100 ${
                      connecting
                        ? "bg-gray-500"
                        : wallet
                        ? "bg-red-500 border hover:border-red-500 hover:bg-white hover:text-black"
                        : "bg-blue-600 border hover:border-blue-600 hover:bg-white"
                    }`}
                    disabled={connecting}
                    onClick={() => (wallet ? disconnect(wallet) : connect())}
                  >
                    {connecting
                      ? "Connecting"
                      : wallet
                      ? "Disconnect"
                      : "Connect Wallet"}
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 mt-4 mb-2 md:mt-9 md:mb-4">
                <h1 className="text-2xl text-color font-semibold text-left">
                  Dashboard
                </h1>
                <select
                  name="userBalance"
                  className="p-1 border border-[#1856f3] rounded cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                </select>
              </div>
            </div>

            <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
              <div className="flex flex-row">
                <h2 className="font-medium mr-1 font-base">Total Value</h2>
                <Image src={viewBalance} alt="icon" className="w-6 h-6 p-1" />
              </div>

              <h1 className="flex-col text-2xl font-medium mt-1">USD 0.00</h1>

              <div className="flex flex-row mt-2">
                <Image
                  src={periodIcon}
                  alt="icon"
                  className="mt-1 w-3 h-3 p-1"
                />
                <p className="ml-1 text-[#727272] text-xs">
                  Updated 5 secs ago
                </p>
              </div>
            </div>
            <div className="grid bg-[#f7f7f7] w-[339px] px-12 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Quick Links
              </h2>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer">
                Generate Payment Link
              </p>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer mt-2">
                Withdrawal
              </p>
            </div>
            <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Conversion Rates
              </h2>

              <div className="flex flex-row">
                <select
                  name="convertFrom"
                  className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                </select>
                <Image
                  src={convertIcon}
                  alt="icon"
                  className="w-5 h-5 pt-[6px]"
                />
                <select
                  name="convertTo"
                  className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                </select>
              </div>
              <p className="text-[#bebebe] mt-2 text-[13px]">
                Updated 15 secs ago
              </p>
              <ul className="mt-2">
                {rates.map((rate) => (
                  <li key={rate.desc} className="flex text-[13px]">
                    <div className="text-color mr-2">{rate.desc}</div>
                    <div className="text-[#bebebe]">{rate.rate}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col flex-auto p-6 pt-4 pr-12 mt-9  pl-0">
            <div className="bg-[#f7f7f7] p-10 pt-8 mt-4 rounded-lg">
              <h2 className="text-color text-xl font-medium text-color">
                Recent Transactions
              </h2>
              <div className="mt-1">
                <ul className="flex justify-between mb-4">
                  {dashData.map((dashDatum) => (
                    <li key={dashDatum.id} className="text-[#727272]">
                      {dashDatum.title}
                    </li>
                  ))}
                </ul>
                <h1 className="flex justify-center items-center order-first font-medium mt-32 mb-32 text-xl">
                  Connect Wallet to view this section.
                </h1>
              </div>
            </div>

            <div className="bg-[#f7f7f7] px-12 py-7 mt-5 rounded-lg ">
              <h2>Generate Invoice</h2>
              <SearchBar />
            </div>
          </div>
        </>
      ) : (
        <>
          <SideNav view={view} closeView={closeView} />
          <div className="flex flex-col p-5 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-row justify-between md:order-last">
                <SideNavToggle openView={openView} />
                <div className="flex self-end order-last">
                  <Image
                    src={notiIcon}
                    alt="Noti Icon"
                    className="w-7 h-7 p-1 pb-0 cursor-pointer"
                  />
                  <button
                    className={`border border-gray-200 px-4 py-2 rounded-md text-gray-100 ${
                      connecting
                        ? "bg-gray-500"
                        : wallet
                        ? "bg-red-500 border border-none hover:bg-red-700"
                        : "bg-blue-500 border border-none hover:bg-blue-700"
                    }`}
                    disabled={connecting}
                    onClick={() => (wallet ? disconnect(wallet) : connect())}
                  >
                    {connecting
                      ? "Connecting"
                      : wallet
                      ? "Disconnect"
                      : "Connect Wallet"}
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 mt-4 mb-2 md:mt-9 md:mb-4">
                <h1 className="text-2xl text-color font-semibold text-left">
                  Dashboard
                </h1>
                <select
                  name="userBalance"
                  className="p-1 border border-[#1856f3] rounded cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-center items-center">
              <div className="flex-none py-7 md:p-7 flex-col md:flex-row md:w-2/5 w-full">
                <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
                  <div className="flex flex-row">
                    <h2 className="font-medium mr-1 font-base">Total Value</h2>
                    <Image
                      src={viewBalance}
                      alt="icon"
                      className="w-6 h-6 p-1"
                    />
                  </div>

                  <h1 className="flex-col text-2xl font-medium mt-1">
                    USD 75,690.73
                  </h1>

                  <div className="flex flex-row mt-2">
                    <Image
                      src={periodIcon}
                      alt="icon"
                      className="mt-1 w-3 h-3 p-1"
                    />
                    <p className="ml-1 text-[#727272] text-xs">
                      Updated 5 secs ago
                    </p>
                  </div>
                </div>
                <div className="grid bg-[#f7f7f7] px-12 py-6 mt-5 rounded-lg w-full">
                  <h2 className="text-color text-xl font-medium mb-4">
                    Quick Links
                  </h2>
                  <Link href="/user/payments/generate-payment-link">
                    <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer mb-4">
                      Generate Payment Link
                    </p>
                  </Link>
                  <Link href="/user/dashboard">
                    <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer mb-2">
                      Withdrawal
                    </p>
                  </Link>
                </div>
                <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
                  <h2 className="text-color text-xl font-medium mb-4">
                    Conversion Rates
                  </h2>

                  <div className="flex flex-row">
                    <select
                      name="convertFrom"
                      className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer"
                    >
                      <option value="usdc">USDC</option>
                      <option value="matic">MATIC</option>
                    </select>
                    <Image
                      src={convertIcon}
                      alt="icon"
                      className="w-5 h-5 pt-[6px]"
                    />
                    <select
                      name="convertTo"
                      className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer"
                    >
                      <option value="usdc">USDC</option>
                      <option value="matic">MATIC</option>
                    </select>
                  </div>
                  <p className="text-[#bebebe] mt-2 text-[13px]">
                    Updated 15 secs ago
                  </p>
                  <ul className="mt-2">
                    {rates.map((rate) => (
                      <li key={rate.desc} className="flex text-[13px]">
                        <div className="text-color mr-2">{rate.desc}</div>
                        <div className="text-[#bebebe]">{rate.rate}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:w-3/5 w-full">
                <div className="bg-[#f7f7f7] p-10 pt-8 rounded-lg">
                  <h2 className="text-color text-l md:text-xl md:font-medium text-color">
                    Recent Transactions
                  </h2>
                  <div className="mt-1">
                    <ul className="flex flex-col md:flex-row justify-between mb-2 md:mb-4">
                      {dashData.map((dashDatum) => (
                        <li key={dashDatum.id} className="mb-4">
                          <div className="text-[#727272] text-sm mb-1">
                            {dashDatum.title}
                          </div>
                          <div className="text-black">{dashDatum.desc}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Link
                      href="/user/transactions"
                      type="button"
                      className="text-center font-medium mt-30 md:mt-48 hover:text-white hover:bg-[#1856F3] text-[#727272] border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 cursor-pointer"
                    >
                      Load more
                    </Link>
                  </div>
                </div>

                <div className="bg-[#f7f7f7] px-12 py-7 mt-5 rounded-lg ">
                  <h2>Generate Invoice</h2>
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;

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
    <div className="">
      <input
        type="search"
        name="search invoice"
        id=""
        placeholder="Enter transaction ID"
        className="w-full text-[13px] py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        name="search invoice"
        className="mt-2 py-2 px-3 bg-blue-500 hover:bg-[#1856f3] text-[13px] text-white rounded-md w-40"
      >
        Search
      </button>
    </div>
  );
};
