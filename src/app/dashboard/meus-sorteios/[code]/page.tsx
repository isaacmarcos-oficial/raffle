"use client";
import { useEffect, useState } from "react";
import { Ticket as TicketType } from "@/types/campaign";
import TabsTickets from "./_components/tabsTickets";
import ModalTickets from "./_components/modalTickets";
import TicketsCard from "./_components/ticketsCard";
import { toast } from "sonner";

export default function SorteioPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const code = "A2RYPH"

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}/tickets`);
        if (response.ok) {
          const data = await response.json();

          // Verifica se a resposta contém os tickets e os define no estado
          if (Array.isArray(data.tickets)) {
            setTickets(data.tickets);
          } else {
            console.error("A API retornou dados em formato inesperado:", data);
          }
        } else {
          console.error("Erro ao buscar tickets.");
        }
      } catch (error) {
        console.error("Erro ao carregar tickets:", error);
      }
    };

    fetchTickets();
  }, [code]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id: id,
          paid: true
        }),
      });
  
      if (response.ok) {
        const updatedTicket = await response.json();
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.id === id ? { ...ticket, paid: updatedTicket.paid } : ticket
          )
        );
      } else {
        console.error("Erro ao aprovar o ticket.", "Id:", id, "Code:", code);
      }
    } catch (error) {
      console.error("Erro ao aprovar o ticket:", error);
    }
  };
  

  const handleUndo = async (id: string) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          paid: false }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.id === id ? { ...ticket, paid: updatedTicket.paid } : ticket
          )
        );
        toast.success("Aprovação desfeita com sucesso!");

      } else {
        console.error("Erro ao desfazer aprovação do ticket.", "Id:", id, "Code:", code);
      }
    } catch (error) {
      console.error("Erro ao desfazer aprovação do ticket:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
        toast.success("Ticket deletado com sucesso!");

      } else {
        console.error("Erro ao deletar o ticket.", "Id:", id, "Code:", code);
      }
    } catch (error) {
      console.error("Erro ao deletar o ticket:", error);
    }
  };


  const handleViewNumbers = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <main className="flex-1 py-6 px-4 min-h-screen max-w-[900px]">
        <div className="container mx-auto space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Sorteio</h1>
          </div>

          <TicketsCard
            tickets={tickets}
          />

          <TabsTickets
            tickets={tickets}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleUndo={handleUndo}
            handleViewNumbers={handleViewNumbers}
          />

          <ModalTickets
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedTicket={selectedTicket}
          />
        </div>
      </main>
    </div>
  )
}