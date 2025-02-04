"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TicketsDrawer from './_componentsFixed/TicketDrawer';
import { TicketGrid } from './_components/TicketGrid';
import { toast } from 'sonner';
import { CampaignType, TicketType } from "@/types/campaign";
import TicketModal from "./_componentsFixed/TicketModal";
import ShareCampaign from "./_components/shareCampaign";
import HeaderCampaign from "./_components/headerCampaign";
import ProgressCampaign from "./_components/progressCampaign";
import PrizesCampaign from "./_components/prizesCampaign";
import BannerCampaign from "./_components/bannerCampaign";
import ImagesCarousel from "./_components/imagesCarousel";

export interface CampaignProps {
  campaign: CampaignType;
}

export default function RafleFixed({ campaign }: CampaignProps) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = async (
    buyerName: string,
    recipientName: string,
    phone: string,
    paymentType: TicketType["paymentType"],
    selectedNumbers: string[]
  ): Promise<void> => {
    if (selectedNumbers.length === 0) {
      toast.error("Nenhum número selecionado!");
      return;
    }

    try {
      const normalizedPhone = phone.replace(/\D/g, '');
      const response = await fetch(`/api/campaign/${campaign.code}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({
          numbers: selectedNumbers,
          buyerName,
          recipientName,
          phone: normalizedPhone,
          paid: false,
          paymentType,
        }),
      });

      if (response.ok) {
        const savedTicket = await response.json();
        setTickets((prevTickets) => [...prevTickets, savedTicket]);
        setIsModalOpen(false);
        toast.success("Compra realizada com sucesso!");
        setSelectedNumbers([]);
      } else {
        const errorMessage = await response.text();
        console.error("Erro da API:", errorMessage); // Mensagem da API
        toast.error("Erro ao finalizar a compra!");
      }
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
      toast.error("Erro ao processar a compra.");
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleTicketSelect = (number: string) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers((prev) => [...prev, number]);
    }
  };

  const handleTicketRemove = (number: string) => {
    setSelectedNumbers((prev) => prev.filter((n) => n !== number));
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${campaign.code}/tickets`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Certifique-se de que `data` é uma matriz antes de defini-lo para o estado `tickets`
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
  }, [campaign.code]);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-[1000px] container mx-auto p-4 gap-4">
        <HeaderCampaign campaign={campaign} />

        <BannerCampaign campaign={campaign} />

        <ProgressCampaign campaign={campaign} />

        <Card className="p-6 w-full">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="">
              Descrição/ Regulamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 whitespace-pre-line">
            {campaign.description}
          </CardContent>
        </Card>
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {campaign.images.length > 0 && <ImagesCarousel images={campaign.images} />}
          <PrizesCampaign campaign={campaign} />
        </div>

        <div className="flex w-full gap-6">
          <TicketGrid
            onTicketDeselect={handleTicketRemove}
            tickets={tickets}
            selectedNumbers={selectedNumbers}
            totalNumbers={campaign.quote}
            onTicketSelect={handleTicketSelect}
          />
        </div>

        <ShareCampaign campaign={campaign} />
      </main>

      <TicketsDrawer
        handleModalOpen={handleModalOpen}
        price={campaign.price}
        selectedNumbers={selectedNumbers}
        onRemove={handleTicketRemove}
      />

      <TicketModal
        handlePurchase={(buyerName, phone, paymentType, selectedNumbers, recipientName) => handlePurchase(buyerName, phone, paymentType, selectedNumbers, recipientName)}
        handleClose={() => setIsModalOpen(false)}
        price={campaign.price}
        selectedNumbers={selectedNumbers}
        contactPhone={campaign.contactPhone}
        pixKey={campaign.pixCode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}