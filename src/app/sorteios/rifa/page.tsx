"use client"
import { Campaign, type Ticket as TicketType } from '../../../types/campaign';
import { useState } from "react";
import { TicketForm } from "@/app/sorteios/rifa/_components/TicketForm";
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';
import TicketsDrawer from './_components/TicketDrawer';
import { TicketGrid } from './_components/TicketGrid';

export default function Rifa({title, drawDate,}: Campaign) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const TOTAL_NUMBERS = 200;

  const handleTicketSubmit = async (ticket: Omit<TicketType, "paid">) => {
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });

      if (response.ok) {
        const savedTicket = await response.json();
        setTickets((prevTickets) => [...prevTickets, savedTicket]);
      } else {
        console.error("Failed to save ticket");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-[1000px] container mx-auto p-4 gap-4">
        <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
          <div className=" w-full h-full flex items-center justify-center">
            IMAGEM EM BREVE
          </div>

          <div className="flex w-full py-2 px-4 justify-between items-center space-y-2 mt-auto">
            <h1 className="text-lg font-bold">{title}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <Calendar className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs ">{drawDate}</p>
              </div>
              <div className="flex items-center">
                <Users className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">200</p>
              </div>
            </div>

          </div>
        </Card>

        <TicketsDrawer/>

        <div className="grid grid-cols-3 gap-4">
          <Card className='flex flex-col gap-2'>
            <CardTitle>Total</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{TOTAL_NUMBERS}</CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Vendidos</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{tickets.length }</CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Disponíveis</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{TOTAL_NUMBERS - tickets.length }</CardDescription>
          </Card>
        </div>
        <div className="flex w-full gap-6">
          <TicketGrid
            tickets={tickets}
            totalNumbers={TOTAL_NUMBERS}
            onTicketSelect={setSelectedNumber}
          />

        </div>
      </main>

      {selectedNumber && (
        <TicketForm
          selectedNumber={selectedNumber}
          onSubmit={handleTicketSubmit}
          onClose={() => setSelectedNumber(null)}
        />
      )}
    </div>
  );
}
