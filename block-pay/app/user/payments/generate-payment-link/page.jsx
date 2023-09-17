"use client";

import { Fragment } from "react";
import { SideNav } from "@/components";
import { copyIcon, backarrow } from "@/public/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useContract from "@/app/user/useContract";
import connectWallet from "/app/user/connect";
import { ethers } from "ethers";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { Flex, Spinner } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { Toaster, toast } from "react-hot-toast";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Modal from "@/components/Modal";

const GenPaymentLink = () => {
  const [view, setView] = useState(false);
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentId, setPaymentId] = useState('')
  const [paymentLink, setPaymentLink]= useState('')
  const [userId, setUserId] = useState('')
  const [showModal, setShowModal] = useState(false);


  const router = useRouter();
  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };

  function generatePaymentId() {
    // Generate a random 16-byte buffer as a unique identifier
    const uniqueBytes = crypto.randomBytes(6);
    const uniqueIdentifier = uniqueBytes.toString("hex");

    // Create a timestamp to add to the unique identifier
    const timestamp = Date.now();

    // Combine the unique identifier and timestamp to create the payment ID
    const paymentId = `${uniqueIdentifier}-${timestamp}`;

    return paymentId;
  }

  const db = getFirestore(app);
  const saveToDB= async()=>{
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/paymentPlans`), {
        amount: amount,
        planName: planName,
        paymentId: paymentId,
        paymentLink: paymentLink,
        Description: description
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(`Error adding document : `,   error)
      toast.error(error.message)
    }
  }


  const { provider } = connectWallet();

  const { contract } = useContract();

  useEffect(() => {
    const payId = generatePaymentId();
    setPaymentId(payId);
    console.log(paymentId);
  }, []);

  useEffect(()=>{
    setPaymentLink(`http://localhost:3000/user/payments/payment-link/preview-page?paymentId=${paymentId}`)
  }, [paymentId])

  useEffect(() => {
    console.log(paymentLink);
  }, [paymentLink]);


{/**----======= GENERATE PAYMENT LINK =======---- */}
  const createPaymentPlan = async (e) => {
    e.preventDefault();
    if (!provider) return;
    if (!contract) return;
    if (!paymentId) return;
    try {
      contract.createPaymentBpF(
        planName,
        ethers.parseEther(String(amount)),
        paymentId
      );
      contract.on(
        "CreatedPaymentPlanBpF",
        (blockpayContract, planName, amount, contractIndex, payId, event) => {
          console.log("CreatedPaymentPlan Event", {
            blockpayContract,
            planName,
            amount,
            contractIndex,
            payId,
          });

          const savedDocument =  saveToDB(userId)
          console.log(savedDocument)
          toast.success('Link generated')
        }
      );
    
    } catch (err) {
      console.log("Error from generate payment links: ", err.message);
    }
  };


  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setUserId(user.uid)
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

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId);
    try {
      toast.success("Payment ID copied successfully!");
    } catch (error) {
      toast.error("Payment ID not copied!");
    }
  };


  return (
    <main className="flex">
      <Fragment>
        <SideNav view={view} closeView={closeView} />
        <div className="w-full">
          <div className="flex-row mt-5 mx-5">
            <SideNavToggle openView={openView} />
          </div>
          <div className="flex justify-center mt-0 items-center p-12">
            <div className="flex flex-col rounded-3xl justify-center items-center bg-[#f7f7f7] p-7 w-[450px]">
              <div className="grid w-full">
                <Link href="/user/payments" className="flex-row order-first">
                  <div className="flex justify-start items-start cursor-pointer">
                    <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
                    <p className="ml-2 text-sm text-color">Back</p>
                  </div>
                </Link>
                <h2 className="h2 text-color mt-2 mb-5 flex justify-center">
                  Generate Payment Links
                </h2>
              </div>
              <form className="flex flex-col" onSubmit={createPaymentPlan}>
                <input
                  type="text"
                  placeholder="Payment Name"
                  id="payment-name"
                  name="payment-name"
                  value={planName}
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
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                  className="w-[310px] break-words h-[77px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <input
                  type="number"
                  placeholder="Amount In USD"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  required
                  className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />

                <div className="flex justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Payment ID"
                    id="paymentID"
                    name="paymentID"
                    value={paymentId}
                    readOnly
                    required
                    className="w-[264px] text-left px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                    />

                    <button type="button" onClick={handleCopy}>
                      <Image src={copyIcon} className="p-[1.2px] mr-3" />
                    </button>
                    <Toaster position="top-right" reverseOrder={false}/>
                </div>

                {/**---=========== MODAL ===========--- */}
                <Modal isShown={showModal} onClose={() => setShowModal(false)}/>


                <div className="mb-2">
                  <button
                    type="submit"
                    className="w-[310px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                    onSubmit={() => setShowModal(true)}
                  >
                    Create Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
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
