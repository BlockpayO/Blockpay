'use client'
import SideNav from "@/components/SideNav";
import Image from "next/image";
import Link from "next/link";
import { viewBalance, periodIcon, convertIcon, notiIcon } from "@/public/assets/images";
import { dashData, rates } from "@/constants";
import { useState, useEffect} from 'react';
import { ethers } from 'ethers';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from "@/firebase/firebase";
import {Oval} from 'react-loader-spinner'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [connectedAddress, setConnectedAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

    
    async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const startChars = 6
        const endChars = 6
        const separator = '...'
        const trimmedAddress = address.toLowerCase(); // Ensure the address is lowercase
        const beginning = trimmedAddress.substring(0, startChars);
        const end = trimmedAddress.substring(trimmedAddress.length - endChars);
        const finalAddress = `${beginning}${separator}${end}`
        setConnectedAddress(finalAddress);
        setIsConnected(true)
        console.log('wallet connected')
        toast.success('wallet connected')
        } else {
        console.error('Ethereum provider not found. Please install MetaMask or another Ethereum wallet.');
        }
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        toast.error(error)
    }
}

const router = useRouter()
useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
        setIsLoading(false);
        } else {
        router.push('/sign-in');
        }
    });

    return () => unsubscribe(); 
    }, [router]);


    if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
<Oval
    height={80}
    width={80}
    color="#1856f3"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#1856f3"
    strokeWidth={2}
    strokeWidthSecondary={2}

/>
        </div>
    );
}

    return (
        <main className="flex">
            {/**-------======== BEFORE CONNECTING WALLET =======------ */}

            {!isConnected ?
            <>
            <SideNav />
            <div className="flex-1 p-7">
                <div className="flex mt-9 mb-4">
                    <h1 className="text-3xl text-color font-semibold text-left mr-2">
                        Dashboard
                    </h1>
                    <select name="userBalance" className="p-1 border border-[#1856f3] rounded cursor-pointer">
                        <option value="usdc">USDC</option>
                        <option value="matic">MATIC</option>
                        <option value="eth">ETH</option>
                    </select>
                </div>
                

                <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
                    <div className="flex flex-row">
                        <h2 className="font-medium mr-1 font-base">
                            Total Value
                        </h2> 
                        <Image src={viewBalance} className="w-6 h-6 p-1" />
                    </div>
                    
                    <h1 className="flex-col text-2xl font-medium mt-1">
                        USD 0.00
                    </h1> 
                    
                    <div className="flex flex-row mt-2">
                        <Image  src={periodIcon} className="mt-1 w-3 h-3 p-1" />
                        <p className="ml-1 text-[#727272] text-xs">
                            Updated 5 secs ago
                        </p>
                    </div>
                </div>
                <div className="grid bg-[#f7f7f7] w-[339px] px-12 py-6 mt-5 rounded-lg">
                    <h2 className="text-color text-xl font-medium mb-4"> 
                            Quick Links
                    </h2>
                    <Link href="payments/generate-payment-link">
                        <p className="p-1 text-[13px] border border-[#bebebe] hover:scale-105 rounded text-center text-[#bebebe] cursor-pointer">
                                Generate Payment Link
                        </p>
                    </Link>
                    <Link href="payments/payment-link">
                        <p className="p-1 text-[13px] border border-[#bebebe] hover:scale-105 rounded text-center text-[#bebebe] cursor-pointer mt-2">
                                Withdrawal
                        </p>
                    </Link>
                </div>
                <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
                    <h2 className="text-color text-xl font-medium mb-4"> 
                        Conversion Rates
                    </h2>
                        
                    <div className="flex flex-row">
                        <select name="convertFrom" className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                        </select>
                        <Image src={convertIcon} className="w-5 h-5 pt-[6px]"/>
                        <select name="convertTo" className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                        </select>
                    </div>
                    <p className="text-[#bebebe] mt-2 text-[13px]">
                        Updated 15 secs ago
                    </p>
                    <ul className="mt-2">
                        {rates.map((rate) => (
                            <li key={rate.desc} className="flex text-[13px]">
                                <div className="text-color mr-2">
                                    {rate.desc}
                                </div>
                                <div className="text-[#bebebe]">
                                    {rate.rate}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col flex-auto p-6 pt-4 pr-12 mt-9  pl-0">
                <button onClick={connectWallet} type="button" className="bg-blue-500 hover:bg-[#1856F3] text-white text-sm w-32 self-end rounded-md py-2 px-3">
                    {isConnected ? connectedAddress : ' Connect Wallet'}
                </button>
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
                    <h2>
                        Generate Invoice
                    </h2>
                    <SearchBar/>
                </div>
            </div>
            </> :
            <>
            <SideNav />
            <div className="flex-1 p-7">
                <div className="flex mt-9 mb-4">
                    <h1 className="text-2xl text-color font-semibold text-left mr-2">
                        Dashboard
                    </h1>
                    <select name="userBalance" className="p-1 border border-[#1856f3] rounded cursor-pointer">
                        <option value="usdc">USDC</option>
                        <option value="matic">MATIC</option>
                        <option value="eth">ETH</option>
                    </select>
                </div>
                

                <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
                    <div className="flex flex-row">
                        <h2 className="font-medium mr-1 font-base">
                            Total Value
                        </h2> 
                        <Image src={viewBalance} className="w-6 h-6 p-1" />
                    </div>
                    
                    <h1 className="flex-col text-2xl font-medium mt-1">
                        USD 75,690.73
                    </h1> 
                    
                    <div className="flex flex-row mt-2">
                        <Image  src={periodIcon} className="mt-1 w-3 h-3 p-1" />
                        <p className="ml-1 text-[#727272] text-xs">
                            Updated 5 secs ago
                        </p>
                    </div>
                </div>
                <div className="grid bg-[#f7f7f7] w-[339px] px-12 py-6 mt-5 rounded-lg">
                    <h2 className="text-color text-xl font-medium mb-4"> 
                            Quick Links
                    </h2>
                    <Link href="payments/generate-payment-link/">
                        <p className="p-1 text-[13px] hover:scale-105 border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer">
                                Generate Payment Link
                        </p>
                    </Link>
                    <Link href="payments/generate-payment-link/">
                        <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center hover:scale-105 text-[#bebebe] cursor-pointer mt-2">
                                Withdrawal
                        </p>
                    </Link>
                </div>
                <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
                    <h2 className="text-color text-xl font-medium mb-4"> 
                        Conversion Rates
                    </h2>
                        
                    <div className="flex flex-row">
                        <select name="convertFrom" className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                        </select>
                        <Image src={convertIcon} className="w-5 h-5 pt-[6px]"/>
                        <select name="convertTo" className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                        </select>
                    </div>
                    <p className="text-[#bebebe] mt-2 text-[13px]">
                        Updated 15 secs ago
                    </p>
                    <ul className="mt-2">
                        {rates.map((rate) => (
                            <li key={rate.desc} className="flex text-[13px]">
                                <div className="text-color mr-2">
                                    {rate.desc}
                                </div>
                                <div className="text-[#bebebe]">
                                    {rate.rate}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col flex-auto p-6 pt-4 pr-12 mt-9  pl-0">
                <div className="flex self-end order-first">
                    <Image src={notiIcon} alt="Noti Icon" className="w-7 h-7 p-1 pb-0 cursor-pointer"/>
                    <button onClick={connectWallet} type="button" className="hover:text-white hover:bg-[#1856F3] text-[#727272] border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 ml-4">
                        {isConnected ? connectedAddress : "Connect Wallet"}
                    </button>
                </div>
                <div className="bg-[#f7f7f7] p-10 pt-8 mt-4 rounded-lg">
                    <h2 className="text-color text-xl font-medium text-color">
                        Recent Transactions
                    </h2>
                    <div className="mt-1">
                        <ul className="flex justify-between mb-4">
                            {dashData.map((dashDatum) => (
                                <li key={dashDatum.id} className="mb-4">
                                    <div className="text-[#727272] mb-1">
                                        {dashDatum.title}
                                    </div>
                                    <div className="text-black">
                                        {dashDatum.desc}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button type="button" className=" font-medium mt-48 hover:text-white hover:bg-[#1856F3] text-[#727272] border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 cursor-pointer">
                                Load more
                        </button>
                    </div>
                </div>
                
                <div className="bg-[#f7f7f7] px-12 py-7 mt-5 rounded-lg ">
                    <h2>
                        Generate Invoice
                    </h2>
                    <SearchBar/>
                </div>
            </div> 
            </>
        }
        </main>
    );
};

export default Dashboard;

const SearchBar = () => {
    return (
        <div>
            <input type="search" name="search invoice" id="" placeholder="Enter transaction ID" className="w-[355px] text-[13px] py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="button" name="search invoice" className="mt-2 ml-4 py-2 px-3 bg-blue-500 hover:bg-[#1856f3] text-[13px] text-white rounded-md w-40">
                Search
            </button>
        </div>
    )
};