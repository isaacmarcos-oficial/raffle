import React from "react";
import { SoldTicketsList } from "@/components/SoldTicketsList";
import { Ticket } from "../types/raffle";
import { Summary } from "./Sumary";

type SidebarProps = {
  tickets: Ticket[];
  totalNumbers: number;
  onTogglePayment: (ticketNumber: string) => void;
  onReleaseNumber: (ticketNumber: string) => void;
};

export function Sidebar({ tickets, totalNumbers, onTogglePayment, onReleaseNumber }: SidebarProps) {
  
  return (
    <div className="space-y-6">
      <SoldTicketsList tickets={tickets} onTogglePayment={onTogglePayment} onReleaseNumber={onReleaseNumber} />
    </div>
  );
}
