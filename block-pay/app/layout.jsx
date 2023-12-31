"use client";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderContext from "./user/context/ProviderContext";
import { useState } from "react";
import { ChakraProvider  } from "@chakra-ui/react";
import { theme } from "@/app/chakra-ui/theme";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import AOS from 'aos';

const aeonik = localFont({
  src: [
    {
      path: "/fonts/Aeonik-Light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "/fonts/Aeonik-Regular.otf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "/fonts/Aeonik-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "/fonts/Aeonik-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Aeonik-RegularItalic.otf",
      weight: "normal",
      style: "italic",
    },
  ],
});

const Layout = ({ children }) => {
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    // Initialize AOS with your configuration
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <html lang="en-CA" className={`${aeonik.className}`}>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Blockpay - Your personal subscription manager</title>
     
      </head>
      <body className={`${aeonik.className}`}>
        <ProviderContext.Provider value={{ provider, setProvider }}>
          <ChakraProvider theme={theme}>
          <main>{children}</main>
          <ToastContainer />
          </ChakraProvider>
        </ProviderContext.Provider>
      </body>
    </html>
  );
};

export default Layout;
