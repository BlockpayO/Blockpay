import SideNav from "@/components/SideNav";
import { transactions } from "@/constants";
import { carlPfp, kaiyaPfp, chancePfp, cristoferPfp, abramPfp } from "@/public/assets/images";
import Image from "next/image";

const TransactionsPage = () => {
    return (
        <main className="flex">
            <SideNav/>
            <div className="flex-1 p-7">
                <div className="flex mt-9 mb-4">
                    <h1 className="text-3xl text-color font-semibold text-left mr-2">
                        Transactions
                    </h1>
                    <select name="userBalance" className="p-1 border border-[#1856f3] rounded cursor-pointer">
                        <option value="usdc">NGN</option>
                        <option value="matic">USD</option>
                    </select>
                </div>
                <div className="p-7 border border-[#1856f3] rounded-lg flex">
                    <div>
                        <button type="button" className=" hover:bg-[#1856F3] hover:text-white text-black text-sm self-end hover:border-0 border border-[#bebebe] rounded-md py-2 w-24 mr-5">
                            All
                        </button>
                        <button type="button" className=" hover:bg-[#1856F3] hover:text-white text-black text-sm self-end hover:border-0 border border-[#bebebe] rounded-md py-2 w-24 mr-5">
                            Pending
                        </button>
                        <button type="button" className=" hover:bg-[#1856F3] hover:text-white text-black text-sm self-end hover:border-0 border border-[#bebebe] rounded-md py-2 w-24 mr-5">
                            Successful
                        </button>
                        <button type="button" className=" hover:bg-[#1856F3] hover:text-white text-black text-sm self-end hover:border-0 border border-[#bebebe] rounded-md py-2 w-24 mr-5">
                            Failed
                        </button>
                    </div>
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
    )
}

export default TransactionsPage


const SearchBar = () => {
    return (
        <div className="flex self-start justify-start">
            <input type="search" name="search invoice" id="" placeholder="Search" className="text-[13px] py-2 w-48 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    )
};