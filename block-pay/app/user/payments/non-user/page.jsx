"use client";

import SideNav from "@/components/SideNav";
import { backarrow } from "@/public/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useContract from "../../useContract";
import connectWallet from "../../connect";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import { app } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { convertIcon } from "@/public/assets/images";
import { toast } from "react-toastify";
const PreviewPage = () => {
  const [view, setView] = useState(false);
  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };
  const { contract } = useContract();
  const { provider, wallet, connecting, connected, connect, disconnect } =
    connectWallet();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [maticAmount, setMaticAmount] = useState("0");
  const [paymentStatus, setPaymentStatus] = useState(false);
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

  const convertUSDToMatic = async (usdAmount) => {
    if (!provider) return;
    if (!contract) return;
    const maticToUSD = await contract.conversionRateBpF(String(1 * 10 ** 18));
    const usdToMatic = (usdAmount * 10 ** 18) / Number(maticToUSD);
    setMaticAmount(String(usdToMatic + 0.000001));
    console.log("matic", usdToMatic);
  };

  const makePayment = async (e) => {
    e.preventDefault();
    if (!connected) {
      toast.error("Please connect wallet");
      return;
    }
    if (!provider) return;
    if (!contract) return;
    if (!paymentId) return;

    // Display a loading message
    const promise = await toast.promise(
      async () => {
        try {
          // Your existing payment logic
          const signer = await provider.getSigner();
          const signerAddress = signer.address;
          const pay = await contract.receivePaymentBpF(
            signerAddress,
            paymentId,
            firstName,
            lastName,
            email,
            { value: ethers.parseEther(maticAmount) }
          );
          const hash = pay.hash;

          // Create a reference to the Firestore database
          const paymentPlanQuery = query(
            collection(db, "paymentPlans"),
            where("paymentId", "==", paymentId)
          );

          const paymentPlanQuerySnapshot = await getDocs(paymentPlanQuery);

          if (paymentPlanQuerySnapshot.empty) {
            // Handle the case where no matching payment plan is found
            console.error("No payment plan found with paymentId: ", paymentId);
            return;
          }

          // Assuming there is only one matching payment plan, use the first document in the snapshot
          const paymentPlanDocRef = paymentPlanQuerySnapshot.docs[0].ref;

          // Create an object with payment details
          const paymentData = {
            creator: signerAddress,
            paymentId,
            firstName,
            lastName,
            email,
            amount,
            timestamp: serverTimestamp(),
            transactionHash: hash,
          };

          // Reference to the "transactions" subcollection within the payment plan
          const transactionsCollectionRef = collection(
            paymentPlanDocRef,
            "transactions"
          );

          // Use `addDoc` to save the payment data to the "transactions" subcollection
          const transactionDocRef = await addDoc(
            transactionsCollectionRef,
            paymentData
          );
          console.log(
            "Transaction document written with ID: ",
            transactionDocRef.id
          );

          // Set the payment status to false when the payment is received
          setPaymentStatus(false);

          // Display a success message
          toast.success(`Payment made for paymentId: ${paymentId}`);
        } catch (err) {
          toast.error(`Unable to complete payment. PaymentId: ${paymentId}`);
          console.log("Error from non-user page: ", err);
        }
      },
      {
        pending: "Making Payment...", // Displayed while the promise is pending
        success: "Transaction approved", // Displayed when the promise resolves successfully
        error: "Payment failed", // Displayed when the promise rejects with an error
        autoClose: 5000, // Close after 5 seconds
      }
    );
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get("paymentId"));
    console.log(searchParams.get("amount"));
    setPaymentId(searchParams.get("paymentId"));
    setAmount(Number(searchParams.get("amount")));
  }, []);

  useEffect(() => {
    if (!amount) return;
    convertUSDToMatic(amount);
  }, [provider, contract]);
  return (
    <main className="flex justify-center h-full bg-[#1856F3]">
      <div className="flex justify-center max-h-full items-center p-12">
        <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] py-7 px-6 w-[525px]">
          <div className="grid w-full mb-3">
            <div className="flex justify-between">
              {/* <Link href="/user/payments" className="flex-row order-first">
                <div className="flex justify-start cursor-pointer">
                  <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
                  <p className="ml-2 text-sm text-color">Back</p>
                </div>
              </Link> */}
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
            </div>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
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
              {`${Number(maticAmount).toFixed(3)}`} MATIC
            </div>
            <div className="mb-10">
              <button
                type="submit"
                className="w-[380px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                {paymentStatus
                  ? ` Making payment for... ${Number(maticAmount).toFixed(
                      3
                    )} MATIC`
                  : ` Pay ${Number(maticAmount).toFixed(3)} MATIC`}
                {/* {` Pay ${Number(maticAmount).toFixed(3)} MATIC`} */}
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
