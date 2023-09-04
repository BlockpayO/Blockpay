"use client";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderContext from "./user/context/ProviderContext";
import { useState } from "react";

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

  return (
    <html lang="en-US" className={`${aeonik.className}`}>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Blockpay - Your personal subscription manager</title>
      </head>
      <body>
        <ProviderContext.Provider value={{ provider, setProvider }}>
          <main>{children}</main>
          <ToastContainer />
        </ProviderContext.Provider>
      </body>
    </html>
  );
};

export default Layout;
