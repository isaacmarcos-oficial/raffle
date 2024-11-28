"use client"
import { type Ticket as TicketType } from '../types/raffle';
import { useState } from "react";
import { TicketForm } from "@/components/TicketForm";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const TOTAL_NUMBERS = 200;

  const handleTicketSubmit = (ticket: Omit<TicketType, "paid">) => {
    setTickets([...tickets, { ...ticket, paid: false }]);
  };

  const handleTogglePayment = (ticketNumber: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.number === ticketNumber
          ? { ...ticket, paid: !ticket.paid }
          : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="max-w-[1000px] container mx-auto p-4">
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">

          <MainContent
            tickets={tickets}
            totalNumbers={TOTAL_NUMBERS}
            onTicketSelect={setSelectedNumber}
          />

          <Sidebar
            tickets={tickets}
            totalNumbers={TOTAL_NUMBERS}
            onTogglePayment={handleTogglePayment}
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
