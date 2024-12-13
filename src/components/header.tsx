"use client"
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeTogle';
import AuthButton from './authButton';
import { SidebarTrigger } from './ui/sidebar';
import Logo from './logo';
import { useSession } from 'next-auth/react';
export default function Header() {
  const { data: session } = useSession();
  
  return (
    <header className="flex light:bg-transparent bg-green-500 text-white p-4 shadow-lg items-center justify-center w-full ">
      <div className="w-full flex max-w-[1000px] container mx-auto items-center gap-2">
        <div className="flex items-center gap-2">
          {session && <SidebarTrigger />}
          <Link className="flex items-center justify-center" href="/">
            <Logo />
          </Link>
        </div>


        <nav className="ml-auto items-center flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Funcionalidades
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Preço
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}