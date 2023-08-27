"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/Button";
import { navLinks } from "@/constants/index";
import { logo } from "@/public/assets/images";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} alt="logo" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-4">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={`/${nav.id}`}
                className="text-gray-300 hover:bg-[#1856F3] px-3 py-2 rounded-md text-sm font-medium"
              >
                {nav.title}
              </Link>
            ))}
            <div className="flex items-center"></div>
          </div>

          <div className="sm:hidden">
            <button
              className="text-gray-300 hover:bg-[#1856F3] px-3 py-2 rounded-md text-sm font-medium flex"
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
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={`/${nav.id}`}
                className="text-gray-500 hover:text-gray-700 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
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
