"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Share2, Users } from 'lucide-react'
import { LotteryTicketsSelector } from './_components/lotteryTicketsSelector'
import { TicketInput } from './_components/ticketInput'
import { useState } from 'react'
import { TicketPurchase } from './_components/ticketPurchase'
import type { Campaign } from '@/types/campaign'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function LotteryPage({ title, drawDate, price, description }: Campaign) {
  const [ticketCount, setTicketCount] = useState(1)

  const handleTicketsSelect = (price: number) => {
    setTicketCount((prev) => prev + price) // Incrementa o preço
  }

  const handleInputChange = (count: number) => {
    setTicketCount(count)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col min-h-screen w-full max-w-[1000px] items-center justify-center">
        <div className="flex justify-center border-b border-border w-full">
          <div className="container px-4 h-14 flex items-center justify-between">
            <Badge variant="outline" className="text-green-400 border-green-400">
              BET SKY AUTORIZADO
            </Badge>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        <div className="flex-1 py-6 w-full">
          <div className="px-4 space-y-8">
            <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
              <div className=" w-full h-full flex items-center justify-center">
                IMAGEM EM BREVE
              </div>

              <div className="flex w-full py-2 px-4 justify-between items-center space-y-2 mt-auto">
                <h1 className="text-lg font-bold">{title}</h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <Calendar className="text-green-500 h-4 w-4 mr-2" />
                    <p className="text-xs ">
                      {format(new Date(drawDate), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-green-500 h-4 w-4 mr-2" />
                    <p className="text-xs">BREVE</p>
                  </div>
                </div>

              </div>
            </Card>

            <LotteryTicketsSelector onTicketsSelect={handleTicketsSelect} />

            <div className="flex w-full gap-4">
              <div className="w-2/3">
                <TicketInput
                  price={price}
                  ticketCount={ticketCount}
                  onTicketChange={handleInputChange}
                />
              </div>
              <div className="w-1/3">
                <TicketPurchase
                  price={price}
                  ticketCount={ticketCount}
                />
              </div>
            </div>

            <Card className="">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Descrição/ Regulamento</h2>

                </div>
                <div className="space-y-4">
                  {description}
                </div>
              </div>
            </Card>

            <Card className='flex flex-col items-center justify-center'>
              <CardHeader className=''>
                Compartilhe:
              </CardHeader>
              <CardContent className='flex gap-2'>
                <Button className=''>
                  FB
                </Button>
                <Button className=''>
                  IG
                </Button>
                <Button className=''>
                  TG
                </Button>
                <Button className=''>
                  X
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
