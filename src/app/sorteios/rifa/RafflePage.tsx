"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, Bookmark, Calendar, Trophy, Users } from 'lucide-react';
import TicketsDrawer from './_components/TicketDrawer';
import { TicketGrid } from '../_components/TicketGrid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { CampaignType, TicketType } from "@/types/campaign";
import TicketModal from "./_components/TicketModal";
import ShareCampaign from "../_components/shareCampaign";
import HeaderCampaign from "../_components/headerCampaign";
import ProgressCampaign from "../_components/progressCampaign";

export interface CampaignProps {
  campaign: CampaignType;
}

export default function Rifa({ campaign }: CampaignProps) {
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

        <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
          <div className="bg-gradient-to-t from-green-500 to-green-600 w-full h-full flex items-center justify-center">
            {campaign.title && <h1 className="text-4xl font-bold uppercase text-white">{campaign.title}</h1>}
          </div>

          <div className="flex w-full py-2 px-4 justify-center items-center space-y-2 mt-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <Bookmark className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">{campaign.code}</p>
              </div>
              <div className="flex items-center">
                <Banknote className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">
                  {campaign.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <Calendar className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">
                  {format(new Date(campaign.drawDate), "dd/MM/yyyy", { locale: ptBR, })}
                </p>
              </div>
              <div className="flex items-center">
                <Users className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">{tickets.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <ProgressCampaign campaign={campaign} />

        <div className="flex w-full gap-6">
          <Card className="p-6 w-2/3">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="">
                Descrição/ Regulamento
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 whitespace-pre-line">
              {campaign.description}
            </CardContent>
          </Card>
          <Card className="w-1/3">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="">
                Prêmios
              </CardTitle>
            </CardHeader>

            <CardHeader className="flex flex-col p-0 mb-4 gap-2">
              <CardTitle className="flex flex-col gap-2">
                {campaign.prizes.map((prize, index) => (
                  <Card key={index} className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <Trophy className="text-green-500 h-4 w-4 mr-2" />
                      <p className="text-green-500">{index + 1}º Prêmio</p>
                    </div>
                    <CardTitle className="text-sm">{prize.title}</CardTitle>
                  </Card>
                ))}
              </CardTitle>
            </CardHeader>

          </Card>
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