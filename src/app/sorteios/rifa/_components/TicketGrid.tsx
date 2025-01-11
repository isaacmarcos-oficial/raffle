import React from 'react';
import { type TicketType } from '@/types/campaign';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface TicketGridProps {
  tickets: TicketType[];
  totalNumbers: number;
  selectedNumbers: string[];
  onTicketSelect: (number: string) => void;
  onTicketDeselect: (number: string) => void;
}

export function TicketGrid({ tickets, totalNumbers, selectedNumbers, onTicketSelect, onTicketDeselect }: TicketGridProps) {
  const getTicketStatus = (number: string) => {
    const ticket = tickets.find((ticket) => ticket.numbers.includes(number));
    if (ticket) {
      return ticket.paid ? "paid" : "unpaid";
    }
    return "available";
  };

  return (
    <Card className="w-full p-6">
      <CardTitle className="text-xl text-center font-semibold mb-4">
        Escolha seu Número
      </CardTitle>
      <CardContent className='p-0'>
        <div className="flex flex-wrap  gap-2">
          {[...Array(totalNumbers)].map((_, index) => {
            const number = (index + 1).toString().padStart(3, '0');
            const status = getTicketStatus(number);
            const isSelected = selectedNumbers.includes(number);

            return (
              <button
                key={number}
                onClick={() =>
                  status === 'available'
                    ? isSelected
                      ? onTicketDeselect(number) // Desmarcar se já estiver selecionado
                      : onTicketSelect(number) // Marcar se não estiver selecionado
                    : undefined // Não faz nada se não estiver disponível
                }
                className={`flex 
              p-4 rounded-lg justify-center items-center text-center font-medium transition-colors
              ${status === "paid"
                    ? "bg-gray-200 text-gray-800 font-semibold cursor-not-allowed hidden" // Vendido e pago
                    : status === "unpaid"
                      ? "bg-gray-100 text-gray-800 cursor-not-allowed hidden" // Vendido e não pago
                      : isSelected
                        ? "bg-green-400 text-green-900" // Destacado se selecionado
                        : "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer" // Disponível
                  }
            `}
              >
                {number}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}