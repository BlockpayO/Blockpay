"use client";
import SideNav from "@/components/SideNav";
import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Stack,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";
import { app } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged  } from "firebase/auth";

const PaymentLinkPage = () => {
  const [view, setView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();



  const openView = (view) => {
    setView(view);
  };

  const closeView = (view) => {
    setView(view);
  };

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const [paymentPlans, setPaymentPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(Array(paymentPlans.length).fill(false));

  const db = getFirestore(app);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchPaymentPlans(user.uid);
        setIsLoading(false); 
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchPaymentPlans = async (userId) => {
    try {
      // Create a reference to the paymentPlans collection
      const paymentPlansRef = collection(db, "paymentPlans");
  
      // Query for the documents where the creatorId matches the user's ID
      const q = query(paymentPlansRef, where("creatorId", "==", userId));
  
      // Fetch the documents
      const querySnapshot = await getDocs(q);
  
      // Initialize an array to store the payment plans
      const paymentPlans = [];
  
      // Loop through the documents and extract the data
      querySnapshot.forEach((doc) => {
        // Extract relevant fields from the document data
        const { amount, planName, paymentId, paymentLink, Description, Timestamp } = doc.data();
  
        // Add the extracted fields to the paymentPlans array
        paymentPlans.push({
          amount,
          planName,
          paymentId,
          paymentLink,
          Description,
          Timestamp,
        });
      });
  
      // Now you have an array of payment plans for the user
      console.log(paymentPlans);
      setPaymentPlans(paymentPlans); // Set the payment plans in your component state
    } catch (error) {
      console.error("Error fetching payment plans: ", error);
    }
  };
  

  useEffect(()=>{
    console.log(paymentPlans)
  }, [paymentPlans])

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


 

  return (
    <Flex>
      <SideNav view={view} closeView={closeView} />

      <Flex p={20} bgColor={"white"} justifyContent={"center"} w={"100vw"}>
        <Flex
          direction={"column"}
          bgColor={"#F7F7F7"}
          w={"70vw"}
          borderRadius={"2xl"}
          boxShadow={"md"}
        >
          <Flex
            p={["10px", "2px", "20px"]}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={["95vw", "95vw", "70vw"]}
          >
            <Flex onClick={goBack} cursor={"pointer"} alignItems={"center"}>
              <Icon
                justifySelf={"flex-end"}
                ml={"auto"}
                as={ChevronLeftIcon}
                color={"#1856F3"}
                fontSize="3xl"
              />
              <Text fontSize={"16px"} color={"#1856F3"}>
                Back
              </Text>
            </Flex>

            <Box>
              <Heading fontSize={["16px", "18px", "25px"]} color={"#1856F3"}>
                Payment Link
              </Heading>
            </Box>

            <Box>
              <Button
                bgColor={"#1856F3"}
                fontSize={["x-small", "x-small", "md"]}
                color={"white"}
                _hover={{
                  bg: "white",
                  border: "1px solid #1856F3",
                  color: "#1856F3",
                }}
                zIndex={"1"}
                borderRadius={"md"}
              >
                Generate Payment Link
              </Button>
            </Box>
          </Flex>

          <TableContainer>
          {paymentPlans.length > 0 ? (<Table borderTop={"1px solid #838383 "} size={"sm"}>
              <Thead>
                <Tr w={"100vw"} color={"#838383"}>
                  <Th>Payment Name</Th>
                  <Th>Payment ID</Th>
                  <Th>Amount</Th>
                  <Th>Actions</Th>
                  <Th>Date Created</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                {/* <Tr>
                  <Td>Cayadi Megantara </Td>
                  <Td>389500</Td>
                  <Td>USD 98.00</Td>
                  <Td color={"#1A57F3"} textDecor={"underline"}>
                    <Link href={"/user/payments/payment-link/preview-page/"}>
                      Preview Page
                    </Link>
                  </Td>
                  <Td>18 minutes ago</Td>
                  <Td>
                    <Button borderRadius={"md"} variant={"outline"}>
                      Edit Link
                    </Button>
                  </Td>
                  <Td>
                    <Text color={"#1856F3"}>Copy Link</Text>
                  </Td>
                  <Td>
                    <Icon
                      cursor={"pointer"}
                      onClick={onOpen}
                      justifySelf={"flex-end"}
                      color={"red"}
                      ml={"auto"}
                      as={CloseIcon}
                      fontSize="xl"
                    />
                  </Td>
                </Tr> */}
                {paymentPlans.map((paymentPlan, index) => (
                    <Tr key={index}>
                      <Td>{paymentPlan.planName}</Td>
                      <Td>{paymentPlan.paymentId}</Td>
                      <Td>{`$ ${paymentPlan.amount}`}</Td>
                      <Td color={"#1A57F3"} textDecor={"underline"} >
                        <Link
                          href={`/user/payments/non-user?paymentId=${paymentPlan.paymentId
                        }&amount=${paymentPlan.amount}`}
                        >
                          Preview Page
                        </Link>
                      </Td>
                      <Td>
                      {new Date(paymentPlan.Timestamp.seconds * 1000).toLocaleString()}
                      </Td>
                      <Td cursor={'pointer'}
      onClick={() => {
        navigator.clipboard.writeText(paymentPlan.paymentLink);
        const newCopiedStatus = [...copiedStatus];
        newCopiedStatus[index] = true;
        setCopiedStatus(newCopiedStatus);

        // Reset the copied status after a certain delay (e.g., 2 seconds)
        setTimeout(() => {
          newCopiedStatus[index] = false;
          setCopiedStatus(newCopiedStatus);
        }, 2000); // Adjust the delay as needed
      }}
    >
      <Text color={"#1856F3"}>{copiedStatus[index] ? 'Copied' : "Copy Link"}</Text>
    </Td>
                      <Td>
                        <Icon
                          cursor={"pointer"}
                          onClick={onOpen}
                          justifySelf={"flex-end"}
                          color={"red"}
                          ml={"auto"}
                          as={CloseIcon}
                          fontSize="xl"
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            ) : (

              <Flex alignItems={'center'} justifyContent={'center'}  h={'50vh'}>
              <Text fontSize={'xl'}>No Payment Links Created Yet</Text>
              </Flex>
            )}
          </TableContainer>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PaymentLinkPage;

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
