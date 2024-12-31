"use client"
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeTogle';
import { SidebarTrigger } from './ui/sidebar';
import Logo from './logo';
import { useSession } from 'next-auth/react';
import UserNav from './userNav';
export default function Header() {
  
  const { data: session } = useSession();
  
  return (
    <header className="flex  bg-navBar text-white p-4 shadow-lg items-center justify-center w-full ">
      <div className="w-full flex max-w-[1000px] justify-between container mx-auto items-center gap-2">
        {session && <SidebarTrigger />}
        
        <div className="flex items-center gap-2">
          <Link className="flex items-center justify-center" href="/">
            <Logo />
          </Link>
        </div>


        {/* <nav className="ml-auto items-center flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Funcionalidades
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Preço
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Sobre
          </Link>
        </nav> */}

        <div className="flex items-center ml-2 gap-4">
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}