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
  ModalContent,
} from "@chakra-ui/react";

import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import LogoutModal from "@/components/LogoutModal";
import { MobileLogoutModal } from "@/components/LogoutModal";
import Link from "next/link";

const SideNav = ({ view, closeView }) => {
  const [username, setUsername] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = getAuth(app);
  const user = auth.currentUser;
  // console.log(user);
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
        <Link href="/user/dashboard/">
          <Image
            src={logo}
            className="w-[10rem] h-[5rem] cursor-pointer"
            alt="Logo"
          />
        </Link>
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current hover:fill-white"
                      d="M21 11H17.06C16.9903 10.9905 16.9197 10.9905 16.85 11H16.68C16.6277 11.0298 16.5776 11.0632 16.53 11.1C16.4743 11.1368 16.4209 11.1768 16.37 11.22C16.3366 11.2609 16.3065 11.3043 16.28 11.35C16.2342 11.413 16.194 11.4799 16.16 11.55L14.56 15.96L10.39 4.65999C10.3199 4.46693 10.1921 4.30014 10.0239 4.18227C9.85577 4.06439 9.65537 4.00116 9.45 4.00116C9.24463 4.00116 9.04423 4.06439 8.87605 4.18227C8.70788 4.30014 8.58007 4.46693 8.51 4.65999L6.2 11H3C2.73478 11 2.48043 11.1053 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H7.3C7.35684 12.9726 7.4105 12.9391 7.46 12.9C7.51568 12.8632 7.56911 12.8231 7.62 12.78L7.71 12.65C7.75766 12.5882 7.79794 12.5211 7.83 12.45L9.45 7.91999L13.61 19.34C13.6799 19.5333 13.8076 19.7003 13.9758 19.8184C14.144 19.9365 14.3445 19.9999 14.55 20C14.7555 19.9999 14.956 19.9365 15.1242 19.8184C15.2924 19.7003 15.4201 19.5333 15.49 19.34L17.79 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1053 21.2652 11 21 11Z"
                      fill="black"
                    />
                  </svg>
                )}
                {dashboard.icon === settingsIcon && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current hover:stroke-white"
                  >
                    <path
                      className="fill-current hover:fill-white"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 8.25C11.0054 8.25 10.0516 8.64509 9.34835 9.34835C8.64509 10.0516 8.25 11.0054 8.25 12C8.25 12.9946 8.64509 13.9484 9.34835 14.6517C10.0516 15.3549 11.0054 15.75 12 15.75C12.9946 15.75 13.9484 15.3549 14.6517 14.6517C15.3549 13.9484 15.75 12.9946 15.75 12C15.75 11.0054 15.3549 10.0516 14.6517 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25ZM9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75C12.5967 9.75 13.169 9.98705 13.591 10.409C14.0129 10.831 14.25 11.4033 14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25C11.4033 14.25 10.831 14.0129 10.409 13.591C9.98705 13.169 9.75 12.5967 9.75 12Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.975 1.25C11.53 1.25 11.159 1.25 10.855 1.27C10.5443 1.28294 10.2378 1.34714 9.94802 1.46C9.61427 1.59809 9.31099 1.80057 9.05551 2.05589C8.80002 2.3112 8.59733 2.61434 8.45902 2.948C8.31402 3.298 8.27502 3.668 8.25902 4.07C8.25742 4.21702 8.2185 4.36123 8.14591 4.48909C8.07332 4.61695 7.96944 4.72428 7.84402 4.801C7.7149 4.8715 7.56998 4.90803 7.42287 4.90716C7.27576 4.90628 7.13129 4.86803 7.00302 4.796C6.64702 4.608 6.30702 4.457 5.93102 4.407C5.57296 4.3599 5.20914 4.38379 4.86031 4.4773C4.51149 4.57081 4.1845 4.73212 3.89802 4.952C3.65579 5.14688 3.44733 5.38034 3.28102 5.643C3.11102 5.897 2.92502 6.218 2.70302 6.603L2.67802 6.647C2.45502 7.032 2.27002 7.353 2.13602 7.627C1.99602 7.913 1.88602 8.195 1.84602 8.507C1.75062 9.22999 1.9463 9.96127 2.39002 10.54C2.62102 10.841 2.92202 11.06 3.26202 11.274C3.38878 11.3489 3.49439 11.4549 3.56891 11.5819C3.64344 11.7089 3.68442 11.8528 3.68802 12C3.68442 12.1472 3.64344 12.2911 3.56891 12.4181C3.49439 12.5451 3.38878 12.6511 3.26202 12.726C2.92202 12.94 2.62202 13.159 2.39002 13.46C2.17014 13.7465 2.00883 14.0735 1.91532 14.4223C1.82181 14.7711 1.79792 15.1349 1.84502 15.493C1.88602 15.805 1.99502 16.087 2.13502 16.373C2.27002 16.647 2.45502 16.968 2.67802 17.353L2.70302 17.397C2.92502 17.782 3.11102 18.103 3.28102 18.357C3.45802 18.62 3.64802 18.857 3.89802 19.047C4.18443 19.2671 4.51138 19.4285 4.86021 19.5222C5.20903 19.6159 5.5729 19.64 5.93102 19.593C6.30702 19.543 6.64702 19.393 7.00302 19.204C7.13114 19.1321 7.27544 19.0939 7.42237 19.093C7.56931 19.0921 7.71405 19.1286 7.84302 19.199C7.96914 19.2751 8.07367 19.3823 8.14666 19.5102C8.21966 19.6382 8.25868 19.7827 8.26002 19.93C8.27502 20.332 8.31402 20.702 8.46002 21.052C8.59811 21.3858 8.80059 21.689 9.05591 21.9445C9.31122 22.2 9.61436 22.4027 9.94802 22.541C10.238 22.661 10.538 22.708 10.855 22.729C11.159 22.75 11.53 22.75 11.975 22.75H12.025C12.47 22.75 12.841 22.75 13.145 22.73C13.463 22.708 13.762 22.661 14.052 22.54C14.3858 22.4019 14.689 22.1994 14.9445 21.9441C15.2 21.6888 15.4027 21.3857 15.541 21.052C15.686 20.702 15.725 20.332 15.741 19.93C15.7425 19.7828 15.7813 19.6384 15.8539 19.5103C15.9265 19.3823 16.0305 19.2748 16.156 19.198C16.2852 19.1276 16.4302 19.0913 16.5773 19.0923C16.7244 19.0934 16.8688 19.1318 16.997 19.204C17.353 19.392 17.693 19.543 18.069 19.592C18.792 19.6874 19.5233 19.4917 20.102 19.048C20.352 18.856 20.542 18.62 20.719 18.357C20.889 18.103 21.075 17.782 21.297 17.397L21.322 17.353C21.545 16.968 21.73 16.647 21.864 16.373C22.004 16.087 22.114 15.804 22.154 15.493C22.2494 14.77 22.0537 14.0387 21.61 13.46C21.379 13.159 21.078 12.94 20.738 12.726C20.6113 12.6511 20.5056 12.5451 20.4311 12.4181C20.3566 12.2911 20.3156 12.1472 20.312 12C20.312 11.722 20.464 11.446 20.738 11.274C21.078 11.06 21.378 10.841 21.61 10.54C21.8299 10.2535 21.9912 9.92653 22.0847 9.5777C22.1782 9.22888 22.2021 8.86506 22.155 8.507C22.1074 8.19971 22.0094 7.90238 21.865 7.627C21.6943 7.29475 21.5132 6.96792 21.322 6.647L21.297 6.603C21.1143 6.27709 20.9216 5.95693 20.719 5.643C20.5527 5.38062 20.3442 5.14749 20.102 4.953C19.8156 4.73294 19.4887 4.57146 19.1398 4.47778C18.791 4.38409 18.4271 4.36004 18.069 4.407C17.693 4.457 17.353 4.607 16.997 4.796C16.8689 4.86786 16.7246 4.90601 16.5777 4.90688C16.4307 4.90776 16.286 4.87132 16.157 4.801C16.0312 4.72452 15.9269 4.6173 15.854 4.48942C15.7811 4.36154 15.7418 4.21721 15.74 4.07C15.725 3.668 15.686 3.298 15.54 2.948C15.4019 2.61425 15.1994 2.31097 14.9441 2.05549C14.6888 1.8 14.3857 1.59731 14.052 1.459C13.762 1.339 13.462 1.292 13.145 1.271C12.841 1.25 12.47 1.25 12.025 1.25H11.975ZM10.522 2.845C10.599 2.813 10.716 2.784 10.957 2.767C11.204 2.75 11.524 2.75 12 2.75C12.476 2.75 12.796 2.75 13.043 2.767C13.284 2.784 13.401 2.813 13.478 2.845C13.785 2.972 14.028 3.215 14.155 3.522C14.195 3.618 14.228 3.769 14.241 4.126C14.271 4.918 14.68 5.681 15.406 6.1C16.132 6.52 16.997 6.492 17.698 6.122C18.014 5.955 18.161 5.908 18.265 5.895C18.5936 5.85158 18.9259 5.94043 19.189 6.142C19.255 6.193 19.339 6.28 19.474 6.48C19.613 6.686 19.773 6.963 20.011 7.375C20.249 7.787 20.408 8.065 20.517 8.287C20.624 8.504 20.657 8.62 20.667 8.703C20.7104 9.03157 20.6216 9.36392 20.42 9.627C20.356 9.71 20.242 9.814 19.94 10.004C19.268 10.426 18.812 11.162 18.812 12C18.812 12.838 19.268 13.574 19.94 13.996C20.242 14.186 20.356 14.29 20.42 14.373C20.622 14.636 20.71 14.968 20.667 15.297C20.657 15.38 20.623 15.497 20.517 15.713C20.408 15.936 20.249 16.213 20.011 16.625C19.773 17.037 19.612 17.314 19.474 17.52C19.339 17.72 19.255 17.807 19.189 17.858C18.9259 18.0596 18.5936 18.1484 18.265 18.105C18.161 18.092 18.015 18.045 17.698 17.878C16.998 17.508 16.132 17.48 15.406 17.899C14.68 18.319 14.271 19.082 14.241 19.874C14.228 20.231 14.195 20.382 14.155 20.478C14.0922 20.6298 14.0001 20.7677 13.8839 20.8839C13.7677 21.0001 13.6298 21.0922 13.478 21.155C13.401 21.187 13.284 21.216 13.043 21.233C12.796 21.25 12.476 21.25 12 21.25C11.524 21.25 11.204 21.25 10.957 21.233C10.716 21.216 10.599 21.187 10.522 21.155C10.3702 21.0922 10.2323 21.0001 10.1161 20.8839C9.99997 20.7677 9.90784 20.6298 9.84502 20.478C9.80502 20.382 9.77202 20.231 9.75902 19.874C9.72902 19.082 9.32002 18.319 8.59402 17.9C7.86802 17.48 7.00302 17.508 6.30202 17.878C5.98602 18.045 5.83902 18.092 5.73502 18.105C5.40645 18.1484 5.0741 18.0596 4.81102 17.858C4.74502 17.807 4.66102 17.72 4.52602 17.52C4.33793 17.2272 4.15885 16.9287 3.98902 16.625C3.75102 16.213 3.59202 15.935 3.48302 15.713C3.37602 15.496 3.34302 15.38 3.33302 15.297C3.2896 14.9684 3.37845 14.6361 3.58002 14.373C3.64402 14.29 3.75802 14.186 4.06002 13.996C4.73202 13.574 5.18802 12.838 5.18802 12C5.18802 11.162 4.73202 10.426 4.06002 10.004C3.75802 9.814 3.64402 9.71 3.58002 9.627C3.37845 9.36392 3.2896 9.03157 3.33302 8.703C3.34302 8.62 3.37702 8.503 3.48302 8.287C3.59202 8.064 3.75102 7.787 3.98902 7.375C4.22702 6.963 4.38802 6.686 4.52602 6.48C4.66102 6.28 4.74502 6.193 4.81102 6.142C5.0741 5.94043 5.40645 5.85158 5.73502 5.895C5.83902 5.908 5.98502 5.955 6.30202 6.122C7.00202 6.492 7.86802 6.52 8.59402 6.1C9.32002 5.681 9.72902 4.918 9.75902 4.126C9.77202 3.769 9.80502 3.618 9.84502 3.522C9.97202 3.215 10.215 2.972 10.522 2.845Z"
                      fill="black"
                    />
                  </svg>
                )}
                {dashboard.icon === logOut && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current hover:fill-white"
                      d="M6 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V5C17 5.26522 16.8946 5.51957 16.7071 5.70711C16.5196 5.89464 16.2652 6 16 6C15.7348 6 15.4804 5.89464 15.2929 5.70711C15.1054 5.51957 15 5.26522 15 5V4H6V20H15V19C15 18.7348 15.1054 18.4804 15.2929 18.2929C15.4804 18.1054 15.7348 18 16 18C16.2652 18 16.5196 18.1054 16.7071 18.2929C16.8946 18.4804 17 18.7348 17 19V20C17 20.5304 16.7893 21.0391 16.4142 21.4142C16.0391 21.7893 15.5304 22 15 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2Z"
                      fill="black"
                    />
                    <path
                      className="fill-current hover:fill-white"
                      d="M16.795 16.295C17.185 16.685 17.815 16.685 18.205 16.295L21.793 12.707C21.9805 12.5195 22.0858 12.2652 22.0858 12C22.0858 11.7348 21.9805 11.4805 21.793 11.293L18.205 7.705C18.0149 7.53319 17.7661 7.44099 17.5099 7.44746C17.2538 7.45392 17.0099 7.55856 16.8287 7.73974C16.6476 7.92092 16.5429 8.16479 16.5365 8.42093C16.53 8.67707 16.6222 8.92591 16.794 9.116L18.67 11H10C9.73478 11 9.48043 11.1054 9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13H18.67L16.794 14.884C16.6073 15.0714 16.5026 15.3252 16.5028 15.5897C16.503 15.8542 16.6081 16.1079 16.795 16.295Z"
                      fill="black"
                    />
                  </svg>
                )}
                {dashboard.icon === homeIcon && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-current hover:stroke-white"
                      d="M17 16V7.5C17 7.34475 16.9639 7.19164 16.8944 7.05279C16.825 6.91393 16.7242 6.79315 16.6 6.7L9.6 1.45C9.4269 1.32018 9.21637 1.25 9 1.25C8.78363 1.25 8.5731 1.32018 8.4 1.45L1.4 6.7C1.2758 6.79315 1.175 6.91393 1.10557 7.05279C1.03614 7.19164 1 7.34475 1 7.5V16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17H6C6.26522 17 6.51957 16.8946 6.70711 16.7071C6.89464 16.5196 7 16.2652 7 16V13C7 12.7348 7.10536 12.4804 7.29289 12.2929C7.48043 12.1054 7.73478 12 8 12H10C10.2652 12 10.5196 12.1054 10.7071 12.2929C10.8946 12.4804 11 12.7348 11 13V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17H16C16.2652 17 16.5196 16.8946 16.7071 16.7071C16.8946 16.5196 17 16.2652 17 16Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                {dashboard.icon === payments && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current hover:fill-white"
                      d="M16 2C13.24 2 11 4.24 11 7C11 9.76 13.24 12 16 12C18.76 12 21 9.76 21 7C21 4.24 18.76 2 16 2ZM16 10C14.34 10 13 8.66 13 7C13 5.34 14.34 4 16 4C17.66 4 19 5.34 19 7C19 8.66 17.66 10 16 10ZM19 16H17C17 14.8 16.25 13.72 15.13 13.3L8.97 11H1V22H7V20.56L14 22.5L22 20V19C22 17.34 20.66 16 19 16ZM5 20H3V13H5V20ZM13.97 20.41L7 18.5V13H8.61L14.43 15.17C14.77 15.3 15 15.63 15 16C15 16 13 15.95 12.7 15.85L10.32 15.06L9.69 16.96L12.07 17.75C12.58 17.92 13.11 18 13.65 18H19C19.39 18 19.74 18.24 19.9 18.57L13.97 20.41Z"
                      fill="black"
                    />
                  </svg>
                )}
              </div>
              <div>{dashboard.title}</div>
            </Link>
          ))}
          <MobileLogoutModal />
        </ul>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius={"2xl"} p={4}>
            <ModalCloseButton bg={"#1856F3"} color={"#fff"} rounded={"full"} />
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
                    Are you sure?
                  </Heading>
                  <Text align={"center"}>
                    Note: All the remaining funds will be lost.
                  </Text>
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
                >
                  Yes
                </Button>
                <Button
                  height={"54px"}
                  color="#fff"
                  bg="rgba(80, 75, 75, 0.35);"
                  _hover={{
                    bg: "white",
                    border: "1px solid #1856F3",
                    color: "#1856F3",
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
