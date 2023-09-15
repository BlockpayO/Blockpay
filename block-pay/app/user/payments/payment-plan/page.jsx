"use client";

import { SideNav } from "@/components";
import { copyIcon, backarrow } from "@/public/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useContract from "../../useContract";
import connectWallet from "../../connect";
import { ethers } from "ethers";

const GenPaymentLink = () => {
  const [view, setView] = useState(false);
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };
  const { provider } = connectWallet();

  const { contract } = useContract();

  const createPaymentPlan = async (e) => {
    e.preventDefault();
    if (provider) {
      try {
        if (contract) {
          contract.createPaymentBpF(
            planName,
            ethers.parseEther(String(amount))
          );
          contract.on(
            "CreatedPaymentPlanBpF",
            (blockpayContract, planName, amount, contractIndex, event) => {
              console.log("CreatedPaymentPlan Event", {
                blockpayContract,
                planName,
                amount,
                contractIndex,
              });
            }
          );
        }
      } catch (err) {
        console.log("Error from generate payment links: ", err.message);
      }
    }
  };

  return (
    <main className="flex">
      <SideNav view={view} closeView={closeView} />
      <div className="w-full">
        <div className="flex-row mt-5 mx-5">
          <SideNavToggle openView={openView} />
        </div>
        <div className="flex justify-center items-center p-12">
          <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] p-7 w-[450px]">
            <div className="grid w-full">
              <Link href="/user/payments" className="flex-row order-first">
                <div className="flex justify-start items-start cursor-pointer">
                  <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
                  <p className="ml-2 text-sm text-color">Back</p>
                </div>
              </Link>
              <h2 className="bg-blur h2 text-color mt-2 mb-5 flex justify-center blur-lg">
                Payment Plan
              </h2>
            </div>
            <h1 className="flex justify-center mt-7 font-medium z-50 text-3xl">
              Coming Soon
            </h1>
            <form
              className="flex flex-col blur-lg z--10"
              onSubmit={createPaymentPlan}
            >
              <input
                type="text"
                placeholder="Payment Name"
                id="payment-name"
                name="payment-name"
                onChange={(e) => {
                  setPlanName(e.target.value);
                }}
                required
                className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <input
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
                className="w-[310px] h-[77px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <input
                type="number"
                placeholder="Amount In USD"
                id="amount"
                name="amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required
                className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <input
                type="number"
                placeholder="Payment ID"
                id="paymentID"
                name="paymentID"
                value={""}
                onChange={""}
                required
                className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <div className="mb-2">
                <button
                  type="submit"
                  className="w-[310px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Create Payment Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenPaymentLink;

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
