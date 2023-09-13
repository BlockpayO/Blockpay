"use client";
import { dashboards } from "@/constants";
import {
  logo,
  transactIcon,
  settingsIcon,
  logOut,
  payments,
  homeIcon,
} from "@/public/assets/images";
import Image from "next/image";
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Stack,
  ModalOverlay,
  Button,
  Box,
  Text,
  Heading,
  ModalContent
} from '@chakra-ui/react'

import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import LogoutModal from '@/components/LogoutModal'

import Link from "next/link";

const SideNav = ({ view, closeView }) => {
  const [username, setUsername] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = getAuth(app);
  const user = auth.currentUser;
  console.log(user);
  async function fetchUsername(userId) {
    const db = getFirestore(app);
    try {
      console.log("Fetching username for user ID:", userId);

      const userCollection = collection(db, "users");
      const userDoc = doc(userCollection, userId); // Use the user ID as the document reference
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        console.log("Found user data:");
        const userData = userSnapshot.data();
        console.log(userData);

        const username = userData.username;
        const generatedId = userData.generatedId;
        setGeneratedId(generatedId);
        console.log("Username:", username);
        setUsername(username);
      } else {
        console.log("No user data found for user ID:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  }

  useEffect(() => {
    const userId = user?.uid;
    console.log(user);
    console.log(userId);
    fetchUsername(userId);
  }, [user]);



  return (
    <div
      className={` w-[300px] bg-[#f7f7f7] h-screen fixed lg:sticky top-0 left-0 transition-all ${
        view ? "translate-x-0" : "-translate-x-[300px]"
      } lg:translate-x-0`}
    >
      <svg
        className="lg:hidden fixed top-0 right-0 p-1 bg-[#1856F3] rounded-bl-lg"
        onClick={() => closeView(false)}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
      </svg>
      <div className="flex justify-center my-7">
        <Image
          src={logo}
          className="w-[10rem] h-[5rem] cursor-pointer"
          alt="Logo"
        />
      </div>
      <div className="flex">
        <ul className=" flex flex-col space-y-5">
          {dashboards.map((dashboard) => (
            <Link
              key={dashboard.id}
              href={`/${dashboard.id}`}
              className="flex py-3 px-11 hover:bg-[#1856F3] hover:text-white cursor-pointer"
            >
              <div className="w-6 h-6 mr-2">
                {dashboard.icon === transactIcon && (
                  <Image src={transactIcon} alt="Transaction Icon" />
                )}
                {dashboard.icon === settingsIcon && (
                  <Image src={settingsIcon} alt="Settings Icon" />
                )}
                {dashboard.icon === logOut && (
                  <Image src={logOut} alt="Log Out Icon" />
                )}
                {dashboard.icon === homeIcon && (
                  <Image src={homeIcon} alt="Home Icon" />
                )}
                {dashboard.icon === payments && (
                  <Image src={payments} alt="Payments Icon" className="" />
                )}
                {/* ... repeat for other icons */}
              </div>
              <div>{dashboard.title}</div>
            </Link>
            
            
          ))}
          <LogoutModal />
        </ul>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={'2xl'} p={4}>
          <ModalCloseButton bg={"#1856F3"} color={"#fff"} rounded={"full"} />
          <ModalBody>
            <Stack gap={5}>
              <Box alignSelf={"center"} mb={10}>
                {" "}
                <Heading size={"xl"} color={'#1856F3'} align={"center"} mx={10} mb={5}>
                Are you sure?
                </Heading>
                <Text align={"center"}>Note: All the remaining funds will be lost.</Text>
              </Box>

              <Button
                height={"54px"}
                color="#fff"
                bg="#1856F3"
                _hover={{
                  bg: "white",
                  border: '1px solid #1856F3',
                  color:'#1856F3'
                }}
                rounded={"2xl"}
            
              >
                Yes
              </Button>
              <Button
                height={"54px"}
                color="#fff"
                bg="rgba(80, 75, 75, 0.35);"
                _hover={{
                  bg: "white",
                  border: '1px solid #1856F3',
                  color:'#1856F3'
                }}
                rounded={"2xl"}
                onClick={onClose}
            
              >
                No
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>

      {/**----======= MAKE THE USERNAME AND USER ID APPEAR AFTER CONNECTING WALLET =======---- */}
      <div className="grid justify-center px=11 py-3 mt-12">
        <h1 className="text-color font-medium text-xl">@{username}</h1>
        <p className="text-sm">ID: {generatedId}</p>
      </div>
    </div>
  );
};

export default SideNav;
