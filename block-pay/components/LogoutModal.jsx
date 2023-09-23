import {
  Link,
  Icon,
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LogoutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");
      router.push("/sign-in");
    } catch (error) {
      // An error happened.
      console.error("Sign-out error:", error.message);
    }
  };
  return (
    <>
      <Link
        onClick={onOpen}
        padding="10px"
        borderRadius="2xl"
        ml={"13%"}
        _hover={{
          textDecor: "none",
          bg: "#E8E6F6",
          color: "#1808A3",
        }}
        display={["flex", "none", "flex", "flex", "flex"]}
      >
        <Icon as={FiLogOut} fontSize="4xl" p={1} />
        <Text
          p={1}
          fontSize="md"
          display={["flex", "none", "none", "flex", "flex"]}
        >
          Log out
        </Text>
      </Link>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={"center"}></ModalHeader>
          <ModalCloseButton bg={"#1856F3"} color={"#fff"} rounded={"full"} />
          <ModalBody>
            <Stack>
              <Box alignSelf={"center"} mb={10}>
                {" "}
                <Heading size={"md"} align={"center"} mx={10} mb={5}>
                  You are attempting to logout of Blockpay
                </Heading>
                <Text align={"center"}>Are you sure?</Text>
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
                onClick={logout}
              >
                Log out
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function MobileLogoutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");
    } catch (error) {
      // An error happened.
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <>
      <Link
        ml={"13%"}
        padding="10px"
        borderRadius="2xl"
        _hover={{
          textDecor: "none",
          bg: "#E8E6F6",
          color: "#1808A3",
        }}
        display={["flex", "flex", "flex", "flex", "flex"]}
        onClick={onOpen}
      >
        <Icon as={FiLogOut} fontSize="4xl" p={1} />
        <Text
          p={1}
          fontSize="lg"
          display={["flex", "flex", "flex", "flex", "flex"]}
        >
          Logout
        </Text>
      </Link>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={"center"}></ModalHeader>
          <ModalCloseButton bg={"#1808A3"} color={"#fff"} rounded={"full"} />
          <ModalBody>
            <Stack>
              <Box alignSelf={"center"} mb={10}>
                {" "}
                <Heading size={"md"} align={"center"} mx={10} mb={5}>
                  You are attempting to logout of Digimart
                </Heading>
                <Text align={"center"}>Are you sure?</Text>
              </Box>

              <Button
                height={"54px"}
                color="#fff"
                bg="#1808A3"
                _hover={{
                  bg: "#3626c7",
                }}
                rounded={"2xl"}
                onClick={logout}
              >
                Log out
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* <Link
  onClick={() => navigate("/logout")}
  padding="10px"
  borderRadius="2xl"
  _hover={{
    textDecor: "none",
    bg: "#E8E6F6",
    color: "#1808A3",
  }}
  display={["none", "none", "flex", "flex", "flex"]}
  >
  <Icon as={FiLogOut} fontSize="4xl" p={1} />
  <Text
    p={1}
    fontSize="lg"
    display={["none", "none", "none", "flex", "flex"]}
  >
    Logout
  </Text>
  </Link> */
}
