import "@/styles/globals.css";
import Image from "next/image";
import { heroImg } from "@/public/assets/images";
import { Flex, Box, Text, Hedading, Heading } from "@chakra-ui/react";


const Hero = () => {
  return (
<Flex w={'98.7vw'} minH={['65vh', '50vh', null, null]} 
direction={['column', 'column', 'row', 'row']} px={['7%', '7%', '5%', '7%']} justifyContent={'space-between'} alignItems={'center'}>
  <Box >
    <Heading color={'#1856f3'} fontSize={'45px'}> Your Personal <br/>Subscription <br/> Manager</Heading>
  </Box>

  <Box>
    <Image src={heroImg} alt='hero-img' />
  </Box>

  {/* <section className="flex flex-col sm:flex-row w-100vw px-4 sm:px-24 justify-center items-center">
  <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-6 sm:mt-0">
    <h1 className="text-color text-center sm:text-left text-head p-4">
      Your Personal<br />
      Subscription<br />
      Manager
    </h1>

    <div className="px-8 py-4">
      <Image
        src={heroImg}
        className="w-[300px] h-[273px] sm:w-[459px] sm:h-[417.53px]"
        alt="hero-img"
      />
    </div>
  </div>
</section> */}
</Flex>

  );
};

export default Hero;
