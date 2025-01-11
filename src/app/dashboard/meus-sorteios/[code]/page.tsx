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
    const buyerName = ticket.buyer?.name?.toLowerCase() || "";
    const ticketNumbers = ticket.numbers.join(",").toLowerCase();
    const buyerPhone = ticket.buyer?.phone || "";

    return (
      buyerName.includes(searchName.toLowerCase()) &&
      (searchNumber === "" || ticketNumbers.includes(searchNumber)) &&
      buyerPhone.includes(searchPhone)
    );
  }) || [];

  const handleTicketUpdate = async (
    id: string,
    paid: boolean | null,
    paymentType: TicketType["PaymentType"] | null = null
  ) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: paid === null ? "DELETE" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          paid,
          PaymentType: paymentType
        }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();

        setCampaign((prevCampaign) => {
          if (!prevCampaign || !prevCampaign.tickets) return prevCampaign;

          const updatedTickets = paid === null
            ? prevCampaign.tickets.filter((ticket) => ticket.id !== id)
            : prevCampaign.tickets.map((ticket) =>
              ticket.id === id
                ? {
                  ...ticket,
                  paid: updatedTicket.paid,
                  PaymentType: paymentType || ticket.PaymentType
                }
                : ticket
            );

          return { ...prevCampaign, tickets: updatedTickets };
        });

        toast.success(
          paid === null
            ? "Bilhete rejeitado com sucesso!"
            : paid
              ? "Bilhete aprovado com sucesso!"
              : "Aprovação desfeita com sucesso!"
        );
        console.log(updatedTicket)
      } else {
        console.error("Erro ao atualizar o ticket.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
    }
  };

  const handleUpdateCampaign = async (updatedCampaign: Partial<CampaignType>) => {
    try {
      const response = await fetch(`/api/campaign/${code}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampaign),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setCampaign((prev) => ({ ...prev, ...updatedData }));
        toast.success("Campanha atualizada com sucesso!");
      } else {
        console.error("Erro ao atualizar a campanha.");
        toast.error("Erro ao atualizar a campanha.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a campanha:", error);
      toast.error("Erro ao atualizar a campanha.");
    }
  };
  

  const handleApprove = (id: string, PaymentType: TicketType["PaymentType"]) =>
    handleTicketUpdate(id, true, PaymentType);
  const handleUndo = (id: string) => handleTicketUpdate(id, false);
  const handleReject = (id: string) => handleTicketUpdate(id, null);

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

          <Tabs defaultValue="Insight">
            <TabsList className="w-full mb-4" >
              <TabsTrigger value="Insight" className="w-full">Insight</TabsTrigger>
              <TabsTrigger value="Bilhetes" className="w-full">Bilhetes</TabsTrigger>
              <TabsTrigger value="Setting" className="w-full">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="Insight">
              {campaign && <TicketsCard campaign={campaign} />}
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

            <TabsContent value="Setting">
              {campaign && <CampaignSetting onUpdateCampaign={handleUpdateCampaign} campaign={campaign} />}
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