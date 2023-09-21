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
import { init, useConnectWallet } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import trustModule from "@web3-onboard/trust";

const HELP = `<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 704.01 159.42">
<defs>
  <style>
    .cls-1 {
      fill: #1856f3;
    }
  </style>
</defs>
<g id="Layer_1-2" data-name="Layer 1">
  <path class="cls-1" d="M38.29,50.39h1.34c16.54,0,32.01,7.41,42.43,20.32,10.41,12.89,14.35,29.73,10.79,46.19-5.31,24.64-28.24,42.52-54.51,42.52H2.31L0,121.55H39.63c9.18,0,16.65-7.47,16.65-16.65s-7.47-16.64-16.65-16.64H.41V0H38.29V50.39Zm-24.81,24.81h26.16c16.38,0,29.71,13.33,29.71,29.7s-13.33,29.71-29.71,29.71H13.89l.72,11.74h23.74c20.16,0,37.72-13.55,41.75-32.22,2.72-12.58-.27-25.42-8.19-35.23-7.93-9.83-19.7-15.46-32.27-15.46h-14.41V13.06H13.47v62.14Z"/>
  <g>
    <path class="cls-1" d="M172.92,74.8c5.25,3.76,7.87,9.09,7.87,15.99,0,5.09-1.41,9.2-4.23,12.34s-6.82,5.17-11.99,6.11c6.11,.78,10.83,2.74,14.16,5.88,3.33,3.13,4.99,7.52,4.99,13.16,0,7.21-2.74,12.87-8.22,16.98-5.49,4.11-13.24,6.17-23.27,6.17h-32.79V69.16h31.26c9.56,0,16.96,1.88,22.21,5.64Zm-21.74,28.2c3.76,0,6.7-.9,8.81-2.7s3.17-4.23,3.17-7.29-1.06-5.48-3.17-7.28c-2.11-1.8-5.05-2.7-8.81-2.7h-14.1v19.98h14.1Zm1.18,34.44c4.23,0,7.5-.9,9.81-2.7,2.31-1.8,3.47-4.31,3.47-7.52s-1.17-5.97-3.53-7.81c-2.35-1.84-5.6-2.76-9.75-2.76h-15.28v20.8h15.28Z"/>
    <path class="cls-1" d="M195.35,69.16h17.63v67.1h32.67v15.16h-50.3V69.16Z"/>
    <path class="cls-1" d="M307.69,146.73c-6.19,3.61-13.24,5.41-21.15,5.41s-14.96-1.8-21.15-5.41c-6.19-3.61-11.01-8.6-14.45-14.98-3.45-6.39-5.17-13.53-5.17-21.45s1.72-15.06,5.17-21.45c3.44-6.39,8.26-11.38,14.45-14.98,6.19-3.61,13.24-5.41,21.15-5.41s14.96,1.8,21.15,5.41c6.19,3.6,11.01,8.6,14.46,14.98,3.45,6.38,5.17,13.53,5.17,21.45s-1.73,15.06-5.17,21.45c-3.45,6.38-8.26,11.38-14.46,14.98Zm-33.14-12.99c3.45,2.31,7.44,3.47,11.99,3.47s8.42-1.15,11.87-3.47c3.45-2.31,6.11-5.5,7.99-9.58,1.88-4.07,2.82-8.7,2.82-13.87s-.94-9.79-2.82-13.86c-1.88-4.08-4.54-7.27-7.99-9.58s-7.4-3.47-11.87-3.47-8.54,1.15-11.99,3.47c-3.45,2.31-6.11,5.5-7.99,9.58-1.88,4.07-2.82,8.7-2.82,13.86s.94,9.79,2.82,13.87c1.88,4.07,4.54,7.27,7.99,9.58Z"/>
    <path class="cls-1" d="M353.57,73.63c6.07-3.45,13.22-5.17,21.45-5.17,6.43,0,12.19,1.25,17.28,3.76,5.09,2.51,9.21,6.03,12.34,10.58,3.13,4.54,5.01,9.79,5.64,15.75h-17.63c-1.02-4.7-3.15-8.4-6.4-11.11-3.25-2.7-7.31-4.05-12.17-4.05-6.58,0-11.79,2.47-15.63,7.41-3.84,4.93-5.76,11.44-5.76,19.51s1.92,14.47,5.76,19.45c3.84,4.97,9.05,7.46,15.63,7.46,4.86,0,8.91-1.35,12.17-4.05,3.25-2.7,5.38-6.4,6.4-11.1h17.63c-.63,5.95-2.51,11.2-5.64,15.75-3.13,4.54-7.25,8.07-12.34,10.58-5.09,2.51-10.85,3.76-17.28,3.76-8.22,0-15.38-1.73-21.45-5.17-6.07-3.45-10.73-8.32-13.99-14.63-3.25-6.31-4.88-13.65-4.88-22.04s1.63-15.73,4.88-22.03c3.25-6.31,7.91-11.19,13.99-14.63Z"/>
    <path class="cls-1" d="M438.1,69.28v36.9l32.91-36.9h21.39l-30.2,33.85,32.2,48.3h-21.15l-23.5-34.67-11.63,13.04v21.62h-17.63V69.28h17.63Z"/>
    <path class="cls-1" d="M549.79,72.52c4.51,2.23,7.99,5.42,10.46,9.58,2.47,4.15,3.7,8.97,3.7,14.46s-1.23,10.28-3.7,14.4c-2.47,4.11-5.95,7.29-10.46,9.52-4.51,2.23-9.7,3.35-15.57,3.35h-15.87v27.62h-17.63V69.16h33.5c5.88,0,11.06,1.12,15.57,3.35Zm-17.22,36.61c4.15,0,7.44-1.13,9.87-3.41,2.43-2.27,3.65-5.33,3.65-9.17s-1.21-7.01-3.65-9.28c-2.43-2.27-5.72-3.41-9.87-3.41h-14.22v25.27h14.22Z"/>
    <path class="cls-1" d="M587.45,69.16h21.15l29.85,82.26h-18.92l-6.35-17.98h-31.26l-6.35,17.98h-18.22l30.08-82.26Zm20.92,50.07l-10.93-31.26-10.81,31.26h21.74Z"/>
    <path class="cls-1" d="M646.55,69.16l18.45,33.73,19.39-33.73h19.62l-30.2,51.71v30.55h-17.63v-30.55l-30.2-51.71h20.56Z"/>
  </g>
</g>
</svg>`;

const apiKey = "7ace9320-5f4f-42d7-a89f-f38553654585";

const INFURA_KEY = "270e676f9e754dd2a6d1bfbecf296c04";

const injected = injectedModule();
const trust = trustModule();

const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: "68e6a9128d33db007d0f2261c25a3bad",

  requiredChains: [137, 80001],
};

const walletConnect = walletConnectModule(wcV2InitOptions);

// initialize Onboard
init({
  apiKey,
  wallets: [injected, trust, walletConnect],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "MUMBAI",
      rpcUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    },
  ],
  appMetadata: {
    name: "Blockpay",
    icon: HELP,
    logo: HELP,
    description: "Your Personal Subscription Manager",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

const PreviewPage = () => {
  const [view, setView] = useState(false);
  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };
  const { contract } = useContract();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [maticAmount, setMaticAmount] = useState("0");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const searchParams = useSearchParams();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [provider, setProvider] = useState();
  const [connected, setConnected] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    let ethersProvider;
    if (wallet) {
      try {
        ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
        // Check if ethersProvider is valid before setting it
        setProvider(ethersProvider);
      } catch (error) {
        // Handle any errors that occur during provider initialization
        console.error("Error initializing ethers provider:", error);
      }
    }
  }, [wallet, connecting]);

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

  useEffect(() => {
    if (!amount) return;
    convertUSDToMatic(amount);
  }, [provider, contract]);

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
