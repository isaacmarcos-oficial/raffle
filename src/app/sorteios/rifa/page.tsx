"use client"
import { type Ticket as TicketType } from '../../../types/raffle';
import { useEffect, useState } from "react";
import { TicketForm } from "@/components/TicketForm";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

interface RifaProps {
  title: string;
  endDate: string;
  participants: number;
  price: number;
}

export default function Rifa({ title, endDate, participants, price }: RifaProps) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const TOTAL_NUMBERS = 200;

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/tickets");
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    fetchTickets();
  }, []);

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

  const handleTogglePayment = async (ticketNumber: string) => {
    const ticketToUpdate = tickets.find((ticket) => ticket.number === ticketNumber);
    if (!ticketToUpdate) return;

    const updatedPaidStatus = !ticketToUpdate.paid;

    try {
      const response = await fetch(`/api/tickets/${ticketToUpdate.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paid: updatedPaidStatus }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
          )
        );
      } else {
        console.error("Failed to update ticket payment status");
      }
    } catch (error) {
      console.error("Error updating ticket payment status:", error);
    }
  };

  const handleReleaseNumber = async (ticketNumber: string) => {
    const ticketToDelete = tickets.find((ticket) => ticket.number === ticketNumber);
    if (!ticketToDelete) return;

    try {
      const response = await fetch(`/api/tickets/${ticketToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== ticketToDelete.id)
        );
      } else {
        console.error("Failed to delete ticket");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-950">

      <main className="flex flex-col max-w-[1000px] container mx-auto p-4 gap-4">
        <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
          <div className="bg-gray-800 w-full h-full flex items-center justify-center">
            IMAGEM EM BREVE
          </div>

          <div className="flex w-full py-2 px-4 justify-between items-center space-y-2 mt-auto">
            <h1 className="text-lg font-bold text-white">{title}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <Calendar className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs ">{endDate}</p>
              </div>
              <div className="flex items-center">
                <Users className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">{participants}</p>
              </div>
            </div>

          </div>
        </Card>

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
          <MainContent
            tickets={tickets}
            totalNumbers={TOTAL_NUMBERS}
            onTicketSelect={setSelectedNumber}
          />

          {/* <Sidebar
            tickets={tickets}
            totalNumbers={TOTAL_NUMBERS}
            onTogglePayment={handleTogglePayment}
            onReleaseNumber={handleReleaseNumber}
          /> */}

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
