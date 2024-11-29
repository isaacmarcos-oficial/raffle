"use client"
import { type Ticket as TicketType } from '../types/raffle';
import { useEffect, useState } from "react";
import { TicketForm } from "@/components/TicketForm";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

export default function Home() {
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
            onReleaseNumber={handleReleaseNumber}
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
