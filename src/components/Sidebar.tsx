import React from "react";
import { SoldTicketsList } from "@/components/SoldTicketsList";
import { Ticket } from "../types/raffle";
import { Summary } from "./Sumary";

type SidebarProps = {
  tickets: Ticket[];
  totalNumbers: number;
  onTogglePayment: (ticketNumber: string) => void;
};

export function Sidebar({ tickets, totalNumbers, onTogglePayment }: SidebarProps) {
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow hidden md:block">
      <Summary totalNumbers={totalNumbers} soldTickets={tickets.length} />
      </div>
      <SoldTicketsList tickets={tickets} onTogglePayment={onTogglePayment} />
    </div>
  );
}
