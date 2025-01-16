"use client"
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeTogle';
import { SidebarTrigger } from './ui/sidebar';
import Logo from './logo';
import UserNav from './userNav';
export default function Header() {
  return (
    <header className="flex bg-navBar text-white p-4 shadow-lg items-center justify-center w-full ">
      <div className="w-full grid grid-cols-3 max-w-[1000px] items-center">
        <div className="">
          <SidebarTrigger />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Link className="flex items-center justify-center" href="/">
            <Logo />
          </Link>
        </div>


        <div className="flex items-center ml-2 gap-4 justify-end">
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}