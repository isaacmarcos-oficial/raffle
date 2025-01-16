"use client"
import { Card } from '@/components/ui/card'
import { LotteryTicketsSelector } from './_components/lotteryTicketsSelector'
import { TicketInput } from './_components/ticketInput'
import { useState } from 'react'
import { TicketPurchase } from './_components/ticketPurchase'
import { CampaignType } from '@/types/campaign'
import BannerCampaign from '../_components/bannerCampaign'
import ShareCampaign from '../_components/shareCampaign'
import HeaderCampaign from '../_components/headerCampaign'

export interface CampaignProps {
  campaign: CampaignType;
}

export default function LotteryPage({ campaign }: CampaignProps) {
  const [ticketCount, setTicketCount] = useState(campaign.minQuotes)

  const handleTicketsSelect = (price: number) => {
    setTicketCount((prev) => prev + price) // Incrementa o preço
  }

  const handleInputChange = (count: number) => {
    setTicketCount(count)
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
                    handlePurchase={() => null}
                    selectedNumbers={[]}
                    price={campaign.price}
                    ticketCount={ticketCount}
                  />
                </div>
              </div>
            </Card>

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
    </div>
  )
}
