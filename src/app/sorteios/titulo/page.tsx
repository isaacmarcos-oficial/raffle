"use client"
import { Card } from '@/components/ui/card'
import { LotteryTicketsSelector } from './_components/lotteryTicketsSelector'
import { TicketInput } from './_components/ticketInput'
import { useState } from 'react'
import { TicketPurchase } from './_components/ticketPurchase'
import { CampaignType, TicketType } from '@/types/campaign'
import BannerCampaign from '../_components/bannerCampaign'
import ShareCampaign from '../_components/shareCampaign'
import HeaderCampaign from '../_components/headerCampaign'
import { toast } from 'sonner'
import TicketModal from '../rifa/_components/TicketModal'
import ImagesCarousel from '../_components/imagesCarousel'
import PrizesCampaign from '../_components/prizesCampaign'

export interface CampaignProps {
  campaign: CampaignType;
}

export default function LotteryPage({ campaign }: CampaignProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(campaign.minQuotes)

  const handleTicketsSelect = (price: number) => {
    setTicketCount((prev) => prev + price) // Incrementa o preço
  }

  const handleInputChange = (count: number) => {
    setTicketCount(count)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const aleatoryNumbers = Array.from({ length: ticketCount }, () =>
    Math.floor(1000000 + Math.random() * 9000000).toString() // Gera um número entre 1000000 e 9999999
  )

  const handlePurchase = async (
    buyerName: string,
    recipientName: string,
    phone: string,
    paymentType: TicketType["paymentType"],
    selectedNumbers: string[]
  ): Promise<void> => {
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
        setIsModalOpen(false);
        toast.success("Compra realizada com sucesso!", {
          description: selectedNumbers.join(", "),
          duration: 10000
        },
        );
      } else {
        const errorMessage = await response.text();
        console.error("Erro da API:", errorMessage); // Mensagem da API
        toast.error("Erro ao finalizar a compra!");
      }
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
      toast.error("Erro ao processar a compra.");
    }
  }


  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col min-h-screen w-full max-w-[1000px] items-center justify-center">
        <HeaderCampaign campaign={campaign} />

        <div className="flex-1 py-6 w-full">
          <div className="px-4 space-y-8">
            <BannerCampaign campaign={campaign} />

            <Card className='flex flex-col gap-4'>
              <LotteryTicketsSelector onTicketsSelect={handleTicketsSelect} />

              <div className="flex w-full gap-4">
                <div className="w-2/3">
                  <TicketInput
                    minQuotes={campaign.minQuotes}
                    price={campaign.price}
                    ticketCount={ticketCount}
                    onTicketChange={handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <TicketPurchase
                    handlePurchase={handleModalOpen}
                    selectedNumbers={[]}
                    price={campaign.price}
                    ticketCount={ticketCount}
                  />
                </div>
              </div>
            </Card>

            <div className="flex flex-col md:flex-row w-full gap-8">
              <ImagesCarousel images={campaign.images} />
              <PrizesCampaign campaign={campaign} />
            </div>

            <Card className="">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Descrição/ Regulamento
                  </h2>
                </div>
                <div className="space-y-4">
                  {campaign.description}
                </div>
              </div>
            </Card>
            <ShareCampaign campaign={campaign} />
          </div>
        </div>
      </div>

      <TicketModal
        handlePurchase={(buyerName, recipientName, phone, paymentType, selectedNumbers) => handlePurchase(buyerName, recipientName, phone, paymentType, selectedNumbers)}
        handleClose={() => setIsModalOpen(false)}
        price={campaign.price}
        selectedNumbers={aleatoryNumbers}
        contactPhone={campaign.contactPhone}
        pixKey={campaign.pixCode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
