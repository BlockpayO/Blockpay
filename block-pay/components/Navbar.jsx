"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants/index";
import { logo } from "@/public/assets/images";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    // Your code to toggle the mobile menu goes here
  }
    return (
      <nav>
    <div className='w-[1289px] h-[50px] px-24 flex pt-[40px] justify-between items-center '>
        <Link href="/">
                <Image src={logo} alt="logo" className="w-[9.5rem] h-[4.5rem]" />
        </Link>
        
        <ul className='list-none text-[20px] sm:flex hidden justify-end'>
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={`/${nav.id}`}
                className="text-[#4f7df2e6]  hover:text-gray-300 hover:bg-[#1856F3] px-3 py-2 rounded-md text-lg font-medium"
              >
                {nav.title}
              </Link>
            ))}
            <div className="flex items-center"></div>
          </ul>

          <div className="sm:hidden">
            <button
              className="text-[#4f7df2e6] hover:bg-[#1856F3] px-3 py-2 rounded-md text-sm font-medium flex"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={`/${nav.id}`}
                className="text-[#4f7df2e6] hover:text-gray-700 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
              >
                {nav.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;