"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useContract from "@/app/user/useContract";
import connectWallet from "/app/user/connect";
import { ethers } from "ethers";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebase";
import {  toast } from "react-toastify";
import QRCode from "qrcode.react";
import { copyIcon } from "@/public/assets/images";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const Modal = ({ isShown, onClose }) => {

    const [view, setView] = useState(false);
    const [planName, setPlanName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(null);
    const [paymentId, setPaymentId] = useState('')
    const [paymentLink, setPaymentLink]= useState('')
    const [userId, setUserId] = useState('')
    
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

    const handleCopy = () => {
        navigator.clipboard.writeText(paymentLink);
        try {
            toast.success("Payment Link copied!");
        } catch (error) {
            toast.error("Payment Link not copied");
        }
    };


    if (!isShown) return null
    //{/**---=========== MODAL ===========--- */}
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" >
                <div class="flex flex-col bg-white p-7 rounded-xl shadow w-[500px]">
                    <button className="bg-blue-600 hover:bg-white hover:text-black border hover:border-blue-600 text-white px-4 py-1.5 rounded-md flex mb-3 place-self-end" onClick={() => onClose()}>
                        Close
                    </button>
                    {paymentLink && (<div className="mb-5 flex flex-col justify-center items-center">
                        <QRCode value={paymentLink} className="mb-1.5 h-16 w-16" /> 
                        <Link href={paymentLink} className="text-color text-xs underline">
                            Preview Page
                        </Link>
                    </div>)}
                    <div className="flex justify-center mb-3">
                        <input
                        type="text"
                        placeholder="Payment ID"
                        id="paymentID"
                        name="paymentID"
                        value={paymentLink}
                        readOnly
                        className="w-[300px] text-center px-3 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                        />
                        
                        <button type="button" onClick={handleCopy}>
                            <Image src={copyIcon} className="p-[1.2px] ml-3" />
                        </button>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal