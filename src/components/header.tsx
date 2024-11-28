import React from 'react';
import { Ticket } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-green-600 text-white p-4 shadow-lg items-center justify-center">
      <div className="w-full max-w-[1200px] container mx-auto flex justify-center items-center gap-2">
        <Ticket size={32} />
        <h1 className="text-2xl font-bold">Sistema de Rifas</h1>
      </div>
    </header>
  );
}