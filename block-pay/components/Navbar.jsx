"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants/index";
import { logo } from "@/public/assets/images";
import { app } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav>
      <div className="w-full px-3 sm:px-24 pt-2 pb-3 flex justify-between items-center border border-4-gray">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-28 h-20" />
          </Link>
        </div>

        <div className="lg:hidden">
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

        <ul className="list-none text-[20px] lg:flex justify-end items-center hidden">
          {navLinks.map((nav) => (
            <Link
              key={nav.id}
              href={`/${nav.id}`}
              className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] px-3 py-2 rounded-md text-lg font-medium"
            >
              {nav.title}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
              href="/user/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}
          {!isLoggedIn ? (
            <Link
              className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
              href="/sign-in"
            >
              Login
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 py-1">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={`/${nav.id}`}
                className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
              >
                {nav.title}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
                href="/user/dashboard"
              >
                Dashboard
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                className="text-[#4f7df2e6] hover:text-gray-50 hover:bg-[#1856F3] block px-3 py-2 rounded-md text-base font-medium"
                href="/sign-in"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
