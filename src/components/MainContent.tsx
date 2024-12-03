import React from "react";
import { TicketGrid } from "@/components/TicketGrid";
import { Ticket } from "../types/raffle";
import { Summary } from "./Sumary";
import { Card } from "./ui/card";

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
    <div className="flex w-full space-y-6">
      <Card className="w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Escolha seu Número</h2>
        <TicketGrid
          tickets={tickets}
          totalNumbers={totalNumbers}
          onTicketSelect={onTicketSelect}
        />
      </Card>
    </div>
  );
}
