import React from 'react';
import { Ticket } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ModeTogle';
import AuthButton from './authButton';

export default function Header() {
  return (
    <header className="bg-green-600 text-white p-4 shadow-lg items-center justify-center w-full">
      <div className="w-full flex max-w-[1000px] container mx-auto items-center">
        <Link className="flex items-center justify-center" href="/">
          <Ticket className="h-8 w-8" />
          <span className="ml-2 text-2xl font-bold">Raffle</span>
        </Link>


        <nav className="ml-auto items-center flex gap-4 sm:gap-6">
          <AuthButton/>
          {/* <Link className="text-sm font-semibold hover:underline underline-offset-4" href="/login">
            Login
          </Link> */}
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Funcionalidades
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Preço
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Sobre
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}