"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useContract from "../../useContract";
import connectWallet from "../../connect";
import { useSearchParams } from "next/navigation";
import { app } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { convertIcon } from "@/public/assets/images";

const PreviewPage = () => {
  const { contract } = useContract();
  const { provider, wallet, connected, connect, disconnect } = connectWallet();
  const [amount, setAmount] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  const searchParams = useSearchParams();
  const db = getFirestore(app);

  useEffect(() => {
    if (paymentId) {
      // Reference to the top-level collection where payment plans are stored
      const paymentPlansRef = collection(db, "paymentPlans");

      // Query Firestore for the payment plan document with the matching paymentId
      const paymentQuery = query(
        paymentPlansRef,
        where("paymentId", "==", paymentId)
      );

      getDocs(paymentQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Extract the payment details from the first matching document
            const paymentPlan = querySnapshot.docs[0].data();
            setPaymentDetails(paymentPlan);
            console.log(paymentPlan);
          } else {
            // Handle the case where no matching document is found
            setPaymentDetails(null);
          }
        })
        .catch((error) => {
          // Handle any errors that may occur during the query
          console.error("Error fetching payment plan:", error);
          setPaymentDetails(null); // Set paymentDetails to null in case of an error
        });
    }
  }, [paymentId]);

  useEffect(() => {
    console.log(searchParams.get("paymentId"));
    console.log(searchParams.get("amount"));
    setPaymentId(searchParams.get("paymentId"));
    setAmount(Number(searchParams.get("amount")));
  }, []);

  const makePayment = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="flex justify-center h-full bg-[#1856F3]">
      <div className="flex justify-center max-h-full items-center p-12">
        <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] py-7 px-6 w-[525px]">
          <div className="grid w-full mb-3">
            <div className="flex justify-between">
              <button className="border border-gray-200 px-4 py-2 rounded-md text-gray-100 bg-blue-500 border border-none hover:bg-blue-700">
                Connect Wallet
              </button>
            </div>
            <h2 className="text-3xl mb-3 font-medium text-color mt-[25px] flex justify-center">
              {paymentDetails?.planName}
            </h2>
            <p className="text-xs flex justify-center">
              {paymentDetails?.Description}
            </p>
          </div>
          <form
            className="flex flex-col mt-2 justify-center items-center px-10"
            onSubmit={makePayment}
          >
            <input
              type="text"
              id="payment-amount"
              name="payment-amount"
              value={amount}
              readOnly
              className="w-[380px] mb-6 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
            />

            <div className="flex flex-row justify-between w-[380px] mb-6">
              <input
                type="text"
                placeholder="first name"
                id="first-name"
                name="first-name"
                readOnly
                className="w-[180px] mr-2 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />

              <input
                type="text"
                placeholder="last name"
                id="last-name"
                name="last-name"
                readOnly
                className="w-[180px] px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
              />
            </div>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              readOnly
              className="w-[380px] mb-11 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
            />

            <input
              type="text"
              placeholder="Payment ID"
              id="paymentID"
              name="paymentID"
              value={paymentId}
              readOnly
              className="w-[380px] mb-11 px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
            />
            <div className="w-[380px] mb-11 px-3 flex justify-center py-2 rounded-xl border">
              ${amount}{" "}
              <Image
                src={convertIcon}
                alt="icon"
                className="w-5 h-5 pt-[6px]"
              />
              {`0.000`} MATIC
            </div>
            <div className="mb-10">
              <button
                type="submit"
                className="w-[380px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Pay
              </button>
            </div>
            <div className="w-full flex justify-between ">
              <p className="text-sm">
                Enjoy Seamless tracking of finances <br /> using blockpay
              </p>
              <Button />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PreviewPage;

const Button = () => {
  return (
    <Link href="#">
      <button
        type="button"
        className="rounded-md bg-blue-600 border text-white hover:text-black hover:bg-white hover:border-blue-600 py-2 px-4"
      >
        Get Started
      </button>
    </Link>
  );
};
