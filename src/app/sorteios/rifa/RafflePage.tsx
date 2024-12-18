"use client"
import { useState } from "react";
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';
import TicketsDrawer from './_components/TicketDrawer';
import { TicketGrid } from './_components/TicketGrid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { Campaign, Ticket as TicketType } from "@/types/campaign";

export default function Rifa({ title, drawDate, quote }: Campaign) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const handleTicketSelect = (number: string) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers((prev) => [...prev, number]);
    }
  };

  const handleTicketRemove = (number: string) => {
    setSelectedNumbers((prev) => prev.filter((n) => n !== number));
  };

  const handleFinalizePurchase = async () => {
    toast.success(`Finalizando compra com os números: ${selectedNumbers}.`)
    setSelectedNumbers([]);
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: selectedNumbers }),
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
                <p className="text-xs">
                  {format(new Date(drawDate), "dd/MM/yyyy", { locale: ptBR, })}
                </p>
              </div>
              <div className="flex items-center">
                <Users className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">200</p>
              </div>
            </div>

          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className='flex flex-col gap-2'>
            <CardTitle>Total</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{quote}</CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Vendidos</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{tickets.length}</CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Disponíveis</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{quote - tickets.length}</CardDescription>
          </Card>
        </div>
        <div className="flex w-full gap-6">
          <TicketGrid
            tickets={[]}
            totalNumbers={quote}
            onTicketSelect={handleTicketSelect}
          />

        </div>
      </main>

      <TicketsDrawer
        selectedNumbers={selectedNumbers}
        onFinalize={handleFinalizePurchase}
        onRemove={handleTicketRemove}
      />

      {/* {selectedNumbers && (
        <TicketForm
          selectedNumbers={selectedNumbers}
          onSubmit={handleFinalizePurchase}
          onClose={() => setSelectedNumbers(null)}
        />
      )} */}
    </div>
  );
}