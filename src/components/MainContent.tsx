import React from "react";
import { TicketGrid } from "@/components/TicketGrid";
import { Ticket } from "../types/raffle";
import { Summary } from "./Sumary";

type MainContentProps = {
  tickets: Ticket[];
  totalNumbers: number;
  onTicketSelect: (number: string | null) => void;
};

export function MainContent({
  tickets,
  totalNumbers,
  onTicketSelect,
}: MainContentProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Escolha seu Número</h2>
        <TicketGrid
          tickets={tickets}
          totalNumbers={totalNumbers}
          onTicketSelect={onTicketSelect}
        />
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow md:hidden">
        <Summary totalNumbers={totalNumbers} soldTickets={tickets.length} />
      </div>
    </div>
  );
}
