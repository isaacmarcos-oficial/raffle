"use client";
import { useEffect, useState } from "react";
import { CampaignType, TicketType } from "@/types/campaign";
import TabsTickets from "./_components/ticketsTable";
import ModalTickets from "./_components/ticketsModal";
import TicketsCard from "./_components/ticketsCard";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import TicketsSearch from "./_components/ticketsSearch";
import CampaignSetting from "./_components/campaignSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



export default function SorteioPage() {
  const params = useParams<{ code: string }>()
  const [campaign, setCampaign] = useState<CampaignType>();
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const code = params.code

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}`);
        if (response.ok) {
          const data = await response.json();

          setCampaign(data);
        } else {
          console.error("Erro ao buscar tickets.");
        }
      } catch (error) {
        console.error("Erro ao carregar tickets:", error);
      }
    };

    fetchTickets();
  }, [code]);

  const handleSearchName = (name: string) => setSearchName(name);
  const handleSearchNumber = (number: string) => setSearchNumber(number);
  const handleSearchPhone = (phone: string) => setSearchPhone(phone);

  const filteredTickets = campaign?.tickets?.filter((ticket) => {
    const buyer = campaign.buyer?.find((b) => b.id === ticket.buyerId);

    const buyerName = buyer?.name?.toLowerCase() || "";
    const ticketNumbers = ticket?.numbers.join(",").toLowerCase();
    const buyerPhone = buyer?.phone || "";
  
    return (
      buyerName.includes(searchName.toLowerCase()) &&
      (searchNumber === "" || ticketNumbers.includes(searchNumber)) &&
      buyerPhone.includes(searchPhone)
    );
  }) || [];

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          paid: true,
        }),
      });
  
      if (response.ok) {
        const updatedTicket = await response.json();
  
        setCampaign((prevCampaign) => {
          if (!prevCampaign || !prevCampaign.tickets) return prevCampaign;
  
          const updatedTickets = prevCampaign.tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, paid: updatedTicket.paid } : ticket
          );
  
          return { ...prevCampaign, tickets: updatedTickets };
        });
  
        toast.success("Bilhete aprovado com sucesso!");
      } else {
        console.error("Erro ao aprovar o ticket.");
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
          paid: false,
        }),
      });
  
      if (response.ok) {
        const updatedTicket = await response.json();
  
        setCampaign((prevCampaign) => {
          if (!prevCampaign || !prevCampaign.tickets) return prevCampaign;

  
          const updatedTickets = prevCampaign.tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, paid: updatedTicket.paid } : ticket
          );
  
          return { ...prevCampaign, tickets: updatedTickets };
        });
  
        toast.success("Aprovação desfeita com sucesso!");
      } else {
        console.error("Erro ao desfazer a aprovação do ticket.");
      }
    } catch (error) {
      console.error("Erro ao desfazer a aprovação do ticket:", error);
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
        setCampaign((prevCampaign) => {
          if (!prevCampaign || !prevCampaign.tickets) return prevCampaign;
  
          const updatedTickets = prevCampaign.tickets.filter((ticket) => ticket.id !== id);
  
          return { ...prevCampaign, tickets: updatedTickets };
        });
  
        toast.success("Bilhete rejeitado com sucesso!");
      } else {
        console.error("Erro ao rejeitar o ticket.");
      }
    } catch (error) {
      console.error("Erro ao rejeitar o ticket:", error);
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

          <Tabs defaultValue="Data">
            <TabsList className="w-full mb-4" >
              <TabsTrigger value="Data" className="w-full">Dados</TabsTrigger>
              <TabsTrigger value="Bilhetes" className="w-full">Bilhetes</TabsTrigger>
            </TabsList>

            <TabsContent value="Data">
              {campaign && <TicketsCard campaign={campaign} />}
              {campaign && <CampaignSetting campaign={campaign} />}
            </TabsContent>

            <TabsContent value="Bilhetes">
              <TicketsSearch
                onSearchName={handleSearchName}
                onSearchNumber={handleSearchNumber}
                onSearchPhone={handleSearchPhone}
              />

              <TabsTickets
                tickets={filteredTickets || []}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleUndo={handleUndo}
                handleViewNumbers={handleViewNumbers}
              />
            </TabsContent>
          </Tabs>

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