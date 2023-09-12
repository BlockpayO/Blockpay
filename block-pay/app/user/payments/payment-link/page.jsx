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
} from '@chakra-ui/react'
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const PaymentLinkPage = () => {
    const [view,setView] = useState(false);

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
            
            <Flex p={10} justifyContent={'space-between'}  alignItems={'center'} w={'70vw'}>
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
                <Heading fontSize={'25px'}  color={'#1856F3'}>Payment Link</Heading>
              </Box>

              <Box>
              <Button bgColor={'#1856F3'} 
              color={'white'} borderRadius={'md'}>Generate Payment Link</Button>
              </Box>
            </Flex>

            <TableContainer>
  <Table variant={'simple'} borderTop={'1px solid #838383 '} size={'sm'}>
    <Thead>
      <Tr w={'100vw'} color={'#838383'}>
        <Td>Payment Name</Td>
        <Td>Payment ID</Td>
        <Td>Amount</Td>
        <Td>Actions</Td>
        <Td>Date Created</Td>
      </Tr>
    </Thead>

    <Tbody>
      <style jsx>{`
        /* Apply CSS to remove border-bottom for tbody tr elements */
        tbody tr {
          border-bottom: none;
        }
      `}</style>
      <Tr>
        <Td>Cayadi Megantara</Td>
        <Td>389500</Td>
        <Td>USD 98.00</Td>
        <Td>Preview Page</Td>
        <Td>18 minutes ago</Td>
        <Td>
          <Button borderRadius={'md'} variant={'outline'}>
            Edit Link
          </Button>
        </Td>
        <Td color={'#1856F3'}>Copy Link</Td>
        <Td>
          <Icon
            justifySelf={'flex-end'}
            color={'red'}
            ml={'auto'}
            as={CloseIcon}
            fontSize="xl"
          />
        </Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

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