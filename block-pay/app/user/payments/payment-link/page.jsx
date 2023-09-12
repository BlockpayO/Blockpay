'use client'
import SideNav from "@/components/SideNav";
import { useState } from "react";
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
  ModalHeader,
  ModalContent
} from '@chakra-ui/react'
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PaymentLinkPage = () => {
    const [view,setView] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openView = (view) => {
        setView(view);
      };
    
      const closeView = (view) => {
        setView(view);
      };

      const router = useRouter()
      const goBack = ()=>{
        router.back()
      }

    return (
      <Flex>
         <SideNav view={view} closeView={closeView}/>

         <Flex p={20} bgColor={'white'} justifyContent={'center'}  w={'100vw'}>
          <Flex direction={'column'} bgColor={'#F7F7F7'} w={'70vw'} borderRadius={'2xl'} boxShadow={'md'}>
            
            <Flex p={['10px', '2px', '20px']} justifyContent={'space-between'}  alignItems={'center'} w={['95vw', '95vw', '70vw']}>
              <Flex onClick={goBack} cursor={'pointer'} alignItems={'center'}>
              <Icon
          justifySelf={"flex-end"}
          ml={"auto"}
          as={ChevronLeftIcon}
          color={'#1856F3'}
          fontSize="3xl"/>
                <Text fontSize={'16pxpx'} color={'#1856F3'}>Back</Text>
              </Flex>

              <Box>
                <Heading fontSize={['16px', '18px', '25px']}  color={'#1856F3'}>Payment Link</Heading>
              </Box>

              <Box>
              <Button bgColor={'#1856F3'} fontSize={['x-small', 'x-small', 'md']}
              color={'white'}  _hover={{
                bg: "white",
                border: '1px solid #1856F3',
                color:'#1856F3'
              }} zIndex={'1'}  borderRadius={'md'}>Generate Payment Link</Button>
              </Box>
            </Flex>

            <TableContainer >
              <Table borderTop={'1px solid #838383 '} size={'sm'}>
                <Thead >
                  <Tr w={'100vw'} color={'#838383'}>
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
                  <Tr>
                    <Td>Cayadi Megantara </Td>
                    <Td>389500</Td>
                    <Td>USD 98.00</Td>
                    <Td color={'#1A57F3'} textDecor={'underline'}><Link href={'#'}>Preview Page</Link></Td>
                    <Td>18 minutes ago</Td>
                    <Td><Button borderRadius={'md'} variant={'outline'}>Edit Link</Button></Td>
                    <Td><Text color={'#1856F3'}>Copy Link</Text></Td>
                    <Td><Icon cursor={'pointer'} onClick={onOpen} justifySelf={"flex-end"} color={'red'} ml={"auto"} as={CloseIcon}
                    fontSize="xl"/></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

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
          </Flex>
         </Flex>
      </Flex>
    )
}

export default PaymentLinkPage

const SideNavToggle = ({openView}) => {
    return (
      <svg onClick={() => openView(true)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#080808" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
    );
  };