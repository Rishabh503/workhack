"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-lg border-b border-[#1e293b]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-lg p-1">
           <Link href='/'>
            <Image src={logo} alt="logo" width={40} height={40} />
           </Link>
          </div>
         <Link href="https://edunite-chi.vercel.app/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-white">Edu</span>
          <span className="text-blue-500/80">niteX</span>
        </Link>

        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/subjects" className="hover:text-blue-400 transition">Subject</Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link href="/goal" className="hover:text-blue-400 transition">Goals</Link>

          <Link href="/sessions" className="hover:text-blue-400 transition">Sessions</Link>
          <Link href="/mitar" className="hover:text-blue-400 transition">Mitr</Link>
        </div>

        {/* Auth Buttons */}
        {/* <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition text-sm">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition text-sm">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div> */}

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e293b] px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-blue-400">Home</Link>
          <Link href="/" className="block hover:text-blue-400">Dashboard</Link>
          <Link href="/" className="block hover:text-blue-400">Goals</Link>
          <Link href="/" className="block hover:text-blue-400">Tracker</Link>

          <div className="pt-4 border-t border-gray-700 flex flex-col gap-3">
            <SignedOut>
              <SignInButton>
                <button className="w-full border border-blue-400 rounded-full py-2 text-blue-400 text-sm hover:bg-blue-400 hover:text-white transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="w-full bg-blue-600 text-white rounded-full py-2 text-sm hover:bg-blue-500 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
