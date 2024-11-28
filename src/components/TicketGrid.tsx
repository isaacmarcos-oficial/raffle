import React from 'react';
import { type Ticket } from '../types/raffle';

interface TicketGridProps {
  tickets: Ticket[];
  totalNumbers: number;
  onTicketSelect: (number: string) => void;
}

export function TicketGrid({ tickets, totalNumbers, onTicketSelect }: TicketGridProps) {
  const getTicketStatus = (number: string) => {
    const ticket = tickets.find((ticket) => ticket.number === number);
    if (ticket) {
      return ticket.paid ? "paid" : "unpaid";
    }
    return "available";
  };

  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {[...Array(totalNumbers)].map((_, index) => {
        const number = (index + 1).toString().padStart(2, '0');
        const status = getTicketStatus(number);
        
        return (
          <button
            key={number}
            onClick={() => status === "available" && onTicketSelect(number)}
            className={`
              p-4 rounded-lg justify-center items-center text-center font-medium transition-colors
              ${
                status === "paid"
                  ? "bg-red-100 text-red-800 cursor-not-allowed" // Vendido e pago
                  : status === "unpaid"
                  ? "bg-yellow-100 text-yellow-800 cursor-not-allowed" // Vendido e não pago
                  : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer" // Disponível
              }
            `}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}