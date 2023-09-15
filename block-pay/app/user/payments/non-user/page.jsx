
"use client";

import SideNav from "@/components/SideNav";
import { backarrow } from "@/public/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useContract from "../../useContract";
import connectWallet from "../../connect";

const PreviewPage = () => {
  const [view, setView] = useState(false);
  
  const openView = (view) => {
    setView(view);
  };
  
  const closeView = (view) => {
    setView(view);
  };
  const { contract } = useContract();
  const { provider } = connectWallet();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState("");
  // get payment plan info with payment id
  // make payment with info
  const makePayment = async (paymentId) => {
    if (!provider) return;
    if (!contract) return;
    if (!paymentId) return;
    const signer = await provider.getSigner();
    const signerAddress = signer.address;
    const pay = await contract.receivePaymentBpF(
      signerAddress,
      paymentId,
      firstName,
      lastName,
      email
    );
    contract.on(
      "ReceivedPaymentBpF",
      (
        _creator,
        _paymentId,
        _firstName,
        _lastName,
        _email,
        _timestamp,
        event
      ) => {
        console.log({
          _creator,
          _paymentId,
          _firstName,
          _lastName,
          _email,
          _timestamp,
        });
      }
    );
  };

    return (
        <main className="flex justify-center h-full bg-[#1856F3]">
        <div className="flex justify-center max-h-full items-center p-12">
            <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] py-7 px-6 w-[525px]">
                <div className="grid w-full mb-3">
                    <div className="flex justify-between">
                    <Link href="/user/payments" className="flex-row order-first">
                        <div className="flex justify-start cursor-pointer">
                            <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
                            <p className="ml-2 text-sm text-color">Back</p>
                        </div>
                    </Link>
                    <button
                    className={`flex-row order-last border border-gray-200 px-4 py-2 rounded-md text-gray-100 ${
                        connecting
                        ? "bg-gray-500"
                        : wallet
                        ? "bg-red-500 border hover:border-red-500 hover:bg-white hover:text-black"
                        : "bg-blue-600 border hover:bg-white hover:text-black hover:border-blue-600"
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
                    <h2 className="text-3xl mb-3 font-medium text-color mt-[25px] flex justify-center">
                        defamatory
                    </h2>
                    <p className="text-xs flex justify-center">
                        Payment for Land rent and cleaning of environment 
                    </p>
                </div>
                <form className="flex flex-col mt-2 justify-center items-center px-10" onSubmit={makePayment}>
                <input
                type="number"
                placeholder="500 USD"
                id="payment-amount"
                name="payment-amount"
                value={""}
                readOnly
                className="w-[380px] mb-6 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <div className="flex flex-row justify-between w-[380px] mb-6">
                <input
                type="text"
                placeholder="first name"
                id="first-name"
                name="first-name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                className="w-[180px] mr-2 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <input
                type="text"
                placeholder="last name"
                id="last-name"
                name="last-name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                className="w-[180px] px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="w-[180px] px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />
            </div>

            <input
              type="text"
              placeholder="Payment ID"
              id="paymentID"
              name="paymentID"
              value={""}
              readOnly
              required
              className="w-[380px] mb-11 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
            />

              <div className="mb-10">
                  <button
                      type="submit"
                      className="w-[380px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                      Pay
                  </button>
              </div>
              <div className="w-full flex justify-between ">
                  <p className="text-sm">Enjoy Seamless tracking of finances <br /> using blockpay</p>
                  <Button />
              </div>
              </form>
        </div>
      </div>
    </main>
  );
};

export default PreviewPage

const Button = () => {
    return (
        <Link href="/sign-up">
        <button
            type="button"
            className="rounded-md bg-blue-600 border text-white hover:text-black hover:bg-white hover:border-blue-600 py-2 px-4"
        >
            Get Started
        </button>
        </Link>
    );
};
