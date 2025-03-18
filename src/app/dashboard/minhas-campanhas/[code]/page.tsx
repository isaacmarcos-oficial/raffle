"use client";
import { useEffect, useState } from "react";
import { CampaignType, TicketType } from "@/types/campaign";
import ModalTickets from "./_components/ticketsModal";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import TabsTicketsSearch from "./_components/tabsTicketsSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Box, Eye } from "lucide-react";
import TabsInsight from "./_components/tabsInsight";
import TabsTicketsList from "./_components/tabsTicketsList";
import TabsSetting from "./_components/tabsSetting";
import TabsPrizes from "./_components/tabsPrizes";
import { formatDate } from "@/lib/format";
import CampaignActions from "../_components/campaignActions";
import PayCampaignButton from "@/components/StripeCheckout/PayCampaignButton";

export default function SorteioPage() {
  const params = useParams<{ code: string }>()
  const [campaign, setCampaign] = useState<CampaignType | null>(null); // Inicia como `null`
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchPaymentMethod, setSearchPaymentMethod] = useState("ALL");

  const code = params.code

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
          },
        });
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
  const handleSearchPaymentMethod = (paymentMethod: string) => setSearchPaymentMethod(paymentMethod);


  const filteredTickets = campaign?.tickets?.filter((ticket) => {
    const buyerName = ticket.buyer?.name?.toLowerCase() || "";
    const ticketNumbers = ticket.numbers.join(",").toLowerCase();
    const buyerPhone = ticket.buyer?.phone || "";
    const paymentType = ticket.paymentType || "";

    return (
      buyerName.includes(searchName.toLowerCase()) &&
      (searchNumber === "" || ticketNumbers.includes(searchNumber)) &&
      buyerPhone.includes(searchPhone) &&
      (searchPaymentMethod === "ALL" || paymentType === searchPaymentMethod)
    );
  }) || [];

  const handleTicketUpdate = async (
    id: string,
    paid: boolean | null,
    paymentType: TicketType["paymentType"] | null = null
  ) => {
    try {
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: paid === null ? "DELETE" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || ""
        },
        body: JSON.stringify({
          id,
          paid,
          paymentType: paymentType
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
                  paymentType: paymentType || ticket.paymentType
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
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || ""
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


  const handleApprove = (id: string, paymentType: TicketType["paymentType"]) =>
    handleTicketUpdate(id, true, paymentType);
  const handleUndo = (id: string, paymentType: TicketType["paymentType"]) => handleTicketUpdate(id, false, paymentType);
  const handleReject = (id: string) => handleTicketUpdate(id, null);

  const handleViewNumbers = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <main className="flex-1 py-6 px-4 min-h-screen max-w-[900px]">
        <div className="container mx-auto space-y-8">
          {/* HEADER */}
          <div className="flex flex-col w-full md:flex-row items-center text-center md:text-left gap-4">
            <div className="w-full">
              <h1 className="text-2xl font-bold">{campaign?.title}</h1>
              <div className="text-xs text-zinc-700">
                <p><span className="font-bold">Criado:</span> {campaign?.startDate ? formatDate(campaign.startDate) : null}</p>
                <p><span className="font-bold">Data do Sorteio:</span> {campaign?.drawDate ? formatDate(campaign.drawDate) : null}</p>
                <p><span className="font-bold">Status:</span> {campaign?.status}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center md:items-end">
              <div className="flex gap-2 w-full items-center md:justify-end justify-center">
                <Button asChild size="sm">
                  <Link href={`/dashboard/minhas-campanhas/`}>
                    <ArrowLeft className=" h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/dashboard/minhas-campanhas/${code}/sorteio`}>
                    <Box className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/sorteios/${code}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>

                {campaign && (
                  <CampaignActions
                    campaign={campaign} // Garante que `campaign` não seja null
                    onUpdateStatus={async (status) => {
                      if (!campaign) return; // Evita execução se `campaign` for null

                      const response = await fetch(`/api/campaign/${campaign.code}/status`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status }),
                      });

                      console.log("🔵 Resposta recebida da API:", response);

                      if (!response.ok) {
                        const errorData = await response.json();
                        console.error("❌ Erro ao atualizar status da campanha:", errorData);
                        toast.error(errorData.error || "Erro ao atualizar status.");
                        return;
                      }

                      // Obtém os novos dados da campanha após a atualização
                      const updatedCampaign = await response.json();

                      // Atualiza o estado corretamente
                      setCampaign((prev) => (prev ? { ...prev, ...updatedCampaign } : null));

                      toast.success(`Campanha atualizada para ${status}!`);
                    }}
                  />
                )}
              </div>
              <div className="">
                {campaign?.paid}
              </div>
              {campaign?.paid === false && (
                <div className="flex gap-2">
                  <PayCampaignButton campaignId={campaign.id} type="PAY_PER_CAMPAIGN" />
                </div>
              )}
            </div>
          </div>



          <Tabs defaultValue="Insight" className="">
            <TabsList className="w-full mb-4" >
              <TabsTrigger value="Insight" className="w-full">Insight</TabsTrigger>
              <TabsTrigger value="Tickets" className="w-full">Bilhetes</TabsTrigger>
              <TabsTrigger value="Prizes" className="w-full">Premios</TabsTrigger>
              <TabsTrigger value="Setting" className="w-full">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="Insight">
              {campaign && <TabsInsight campaign={campaign} />}
            </TabsContent>

            <TabsContent value="Tickets">
              <TabsTicketsSearch
                onSearchPaymentMethod={handleSearchPaymentMethod}
                onSearchName={handleSearchName}
                onSearchNumber={handleSearchNumber}
                onSearchPhone={handleSearchPhone}
              />

              <TabsTicketsList
                tickets={filteredTickets || []}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleUndo={handleUndo}
                handleViewNumbers={handleViewNumbers}
              />
            </TabsContent>

            <TabsContent value="Prizes">
              {campaign && <TabsPrizes onUpdatePrizes={handleUpdateCampaign} campaign={campaign} />}
            </TabsContent>

            <TabsContent value="Setting">
              {campaign && <TabsSetting onUpdateCampaign={handleUpdateCampaign} campaign={campaign} />}
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