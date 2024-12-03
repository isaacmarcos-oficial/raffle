"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Share2, Users } from 'lucide-react'
import { LotteryTicketsSelector } from './_components/lotteryTicketsSelector'
import { LotteryList } from './_components/lotteryList'
import { TicketInput } from './_components/ticketInput'
import { useState } from 'react'
import { lotteryNumbers } from '@/app/api/tickets/raffles'
import { TicketPurchase } from './_components/ticketPurchase'

interface LotteryProps {
  id: number
  title: string;
  endDate: string;
  participants: number;
  price: number;
}

export default function LotteryPage({ title, id, price, endDate, participants }: LotteryProps) {
  const [ticketCount, setTicketCount] = useState(1)

  const handleTicketsSelect = (price: number) => {
    setTicketCount((prev) => prev + price) // Incrementa o preço
  }

  const handleInputChange = (count: number) => {
    setTicketCount(count)
  }

  const handlePurchase = () => {
    alert(`Você comprou ${ticketCount} títulos por R$ ${(ticketCount * price).toFixed(2)}`)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col min-h-screen w-full max-w-[1000px] items-center">
        <div className="border-b border-gray-800 w-full">
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
          <div className="container px-4 space-y-8">
            <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
              <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                IMAGEM EM BREVE
              </div>

              <div className="flex w-full py-2 px-4 justify-between items-center space-y-2 mt-auto">
                <h1 className="text-lg font-bold text-white">{title}</h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <Calendar className="text-green-500 h-4 w-4 mr-2" />
                    <p className="text-xs ">{endDate}</p>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-green-500 h-4 w-4 mr-2" />
                    <p className="text-xs">{participants}</p>
                  </div>
                </div>

              </div>
            </Card>

            {/* <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white">{title}</h1>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center">
                  <Calendar className="text-green-500 h-4 w-4 mr-2" />
                  <p className="text-xs ">{endDate}</p>
                </div>
                <div className="flex items-center">
                  <Users className="text-green-500 h-4 w-4 mr-2" />
                  <p className="text-xs">{participants}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-200 mt-6">
                  Quanto mais títulos, mais chances de ganhar!
                </p>
              </div>
            </div> */}

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
                  <h2 className="text-lg font-semibold text-white">🏆 Descrição/ Regulamrnto</h2>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">R$ {price}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolor, consequuntur ex exercitationem quis perferendis culpa esse? Ut dolores consequuntur quaerat. Doloremque officiis temporibus exercitationem molestiae autem eveniet quisquam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rem, ipsa animi maxime totam consequuntur exercitationem reprehenderit. Explicabo culpa aperiam odit amet, reprehenderit nam iure est mollitia. Provident, atque nisi.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rem, ipsa animi maxime totam consequuntur exercitationem reprehenderit. Explicabo culpa aperiam odit amet, reprehenderit nam iure est mollitia. Provident, atque nisi.
                  </p>
                </div>
                {/* <LotteryList numbers={lotteryNumbers} /> */}
              </div>
            </Card>

            <Card className='flex flex-col items-center justify-center'>
              <CardHeader className=''>
                Compartilhe:
              </CardHeader>
              <CardContent className='flex gap-2'>
                <Button className='bg-gray-800 border-gray-200'>
                  FB
                </Button>
                <Button className='bg-gray-800 border-gray-200'>
                  IG
                </Button>
                <Button className='bg-gray-800 border-gray-200'>
                  TG
                </Button>
                <Button className='bg-gray-800 border-gray-200'>
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
