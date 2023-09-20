"use client";

import { Fragment } from "react";
import { SideNav } from "@/components";
import { backarrow } from "@/public/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useContract from "@/app/user/useContract";
import connectWallet from "/app/user/connect";
import { ethers } from "ethers";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { Flex, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import {  toast } from "react-toastify";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import QRCode from "qrcode.react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Stack,
  ModalOverlay,
  Heading,
  ModalContent,
  Icon,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon  } from "@chakra-ui/icons";




const GenPaymentLink = () => {
  const [view, setView] = useState(false);
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentId, setPaymentId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [userId, setUserId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isgenerating, setIsGenerating] = useState(false)
  const [clicked, setClicked] = useState(false)


  const router = useRouter();
  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };

  const timestamp = Timestamp.now()

  function generatePaymentId() {
    // Generate a random 16-byte buffer as a unique identifier
    const uniqueBytes = crypto.randomBytes(6);
    const uniqueIdentifier = uniqueBytes.toString("hex");

    // Create a timestamp to add to the unique identifier
    const timestamp = Date.now();

    // Combine the unique identifier and timestamp to create the payment ID
    const payId = `${uniqueIdentifier}-${timestamp}`;
    setPaymentId(payId);
    return payId;
  }

  const db = getFirestore(app);
  const saveToDB = async (userId) => {
    try {
      const docRef = await addDoc(collection(db, "paymentPlans"), {
        amount: amount,
        planName: planName,
        paymentId: paymentId,
        paymentLink: paymentLink,
        Description: description,
        Timestamp: timestamp,
        creatorId: userId, // Add the creatorId to the document
      });
  
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(`Error adding document: `, error);
      toast.error(error.message);
    }
  };
  

  const { provider, connected } = connectWallet();

  const { contract } = useContract();

  useEffect(() => {
    generatePaymentId();
    console.log(paymentId);
  }, []);

  useEffect(() => {
    setPaymentLink(
      `https://blockpayo.vercel.app/user/payments/non-user?paymentId=${paymentId}&amount=${amount}`
    );
  }, [paymentId, amount]);

  useEffect(() => {
    console.log(paymentLink);
  }, [paymentLink]);
{/**----======= GENERATE PAYMENT LINK =======---- */}
  const createPaymentPlan = async (e) => {
    e.preventDefault();
    console.log('fired plan creation');
  
    if (!connected) {
      toast.error('Please connect wallet');
      return;
    }
  
    if (!provider) return;
    if (!contract) return;
    if (!paymentId) return;
  
    // Use toast.promise to show processing and completion states
    const promise = await toast.promise(
      async () => {
        try {
          console.log('Running contract');
          setIsGenerating(true)
          await contract.createPaymentBpF(
            planName,
            ethers.parseEther(String(amount)),
            paymentId
          );
          contract.on(
            "CreatedPaymentPlanBpF",
            async (
              blockpayContract,
              planName,
              amount,
              contractIndex,
              payId,
              event
            ) => {
              console.log("CreatedPaymentPlan Event", {
                blockpayContract,
                planName,
                amount,
                contractIndex,
                payId,
              });
  
              const savedDocument = await saveToDB(userId);
              console.log("Saved documents", savedDocument);
              onOpen();
              setIsGenerating(false)
  
            }
          );
        } catch (err) {
          console.log("Error from generate payment links: ", err.message);
        }
      } ,  {
        pending: "Generating Link...", // Displayed while the promise is pending
        success: "Transaction approved ", // Displayed when the promise resolves successfully
        error: "Upload failed", // Displayed when the promise rejects with an error
        autoClose: 5000, // Close after 5 seconds
      }
    );
  
    // Use the `promise` variable in your component to display toast messages
  };

  

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setUserId(user.uid);
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
                  placeholder="Payment Description"
                  id="payment-description"
                  name="payment-description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                  className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />
                 <input
                  type="number"
                  placeholder="Amount in USD"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  required
                  className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="PaymentId"
                  id="payment-id"
                  name="payment-id"
                  value={paymentId}
                  disabled
                  className="w-[310px] mb-3 px-4 py-2 rounded-xl border focus:ring focus:ring-blue-300"
                />
                
                
                <button type="button" onClick={handleCopy}>
                  <copyIcon />
                </button>
              

              <div className="mb-2">
                <button
                  type="submit"
                  className="w-[310px] p-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                  disabled={isgenerating}
                >
                 {isgenerating ? 'Generating...' :  "Create Link"}
                </button>
              </div>
            </form>

            <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"2xl"} p={4}>
              <ModalCloseButton
                bg={"#1856F3"}
                color={"#fff"}
                rounded={"full"}
              />
              <ModalBody>
                <Stack gap={5}>
                  <Box alignSelf={"center"} mb={10}>
                    {" "}
                    <Heading
                      size={"xl"}
                      color={"#1856F3"}
                      align={"center"}
                      mx={10}
                      mb={5}
                    >
                      Payment Link Generated
                    </Heading>
                  </Box>

                  <Box>
                  {paymentLink && (
                <div className="mb-5 flex flex-col justify-center items-center">
                  <QRCode value={paymentLink} className="mb-1.5 h-20 w-20" />
                  <Link
                    href={paymentLink}
                    className="text-color text-xs underline"
                  >
                    Preview Page
                  </Link>
                </div>
              )}
                  </Box>

                  <Box>
                    <InputGroup>
                    <Input type="text" value={paymentLink} disabled />
                    <InputRightElement onClick={()=>{
                      setClicked(true)
                      navigator.clipboard.writeText(paymentLink)}}>
                    {clicked ? <Icon as={CheckIcon} boxSize={5} color={'green.400'}/> :<CopyIcon />}
                    </InputRightElement>
                    </InputGroup>
                  </Box>
                  <Button
                    height={"54px"}
                    color="#fff"
                    bg="#1856F3"
                    _hover={{
                      bg: "white",
                      border: "1px solid #1856F3",
                      color: "#1856F3",
                    }}
                    rounded={"2xl"}
                    onClick={()=>{
                      onClose()
                      router.push('/user/payments/payment-link')
                    }}
                  >
                    Ok
                  </Button>
                </Stack>
              </ModalBody>
              <ModalFooter>
                {/* <Button onClick={onClose}>Close</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
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
