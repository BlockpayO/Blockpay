import SideNav from "@/components/SideNav";
import Image from "next/image";
import { viewBalance, periodIcon, convertIcon, notiIcon } from "@/public/assets/images";
import { dashData, rates } from "@/constants";

const Dashboard = () => {
    return (
        <main className="flex">
            {/**-------======== BEFORE CONNECTING WALLET =======------ 
            <SideNav />
            <div className="flex-1 p-7">
                <div className="flex mt-9 mb-4">
                    <h1 className="text-2xl text-color font-semibold text-left mr-2">
                        Dashboard
                    </h1>
                    <select name="userBalance" className="p-1 border border-[#bebebe] rounded cursor-pointer">
                        <option value="usdc">USDC</option>
                        <option value="matic">MATIC</option>
                        <option value="eth">ETH</option>
                        <option value="bsc">BSC</option>
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
                        <select name="convertFrom" className="p-1 border border-[#bebebe] w-24 rounded mr-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                            <option value="bsc">BSC</option>
                        </select>
                        <Image src={convertIcon} className="w-5 h-5 pt-[6px]"/>
                        <select name="convertTo" className="p-1 border border-[#bebebe] w-24 rounded ml-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                            <option value="bsc">BSC</option>
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
                <button type="button" className="bg-blue-500 hover:bg-[#1856F3] text-white text-sm w-32 self-end rounded-md py-2 px-3">
                        Connect Wallet
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
                        <h1 className="flex justify-center items-center order-first font-medium mb-60 text-xl">
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
            
            ------======= AFTER CONNECTING WALLET ======------*/}

            <SideNav />
            <div className="flex-1 p-7">
                <div className="flex mt-9 mb-4">
                    <h1 className="text-2xl text-color font-semibold text-left mr-2">
                        Dashboard
                    </h1>
                    <select name="userBalance" className="p-1 border border-[#bebebe] rounded cursor-pointer">
                        <option value="usdc">USDC</option>
                        <option value="matic">MATIC</option>
                        <option value="eth">ETH</option>
                        <option value="bsc">BSC</option>
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
                        <select name="convertFrom" className="p-1 border border-[#bebebe] w-24 rounded mr-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                            <option value="bsc">BSC</option>
                        </select>
                        <Image src={convertIcon} className="w-5 h-5 pt-[6px]"/>
                        <select name="convertTo" className="p-1 border border-[#bebebe] w-24 rounded ml-1 cursor-pointer">
                            <option value="usdc">USDC</option>
                            <option value="matic">MATIC</option>
                            <option value="eth">ETH</option>
                            <option value="bsc">BSC</option>
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
                    <button type="button" className="hover:text-white hover:bg-[#1856F3] text-[#727272] border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 ml-4">
                        0x123....987
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