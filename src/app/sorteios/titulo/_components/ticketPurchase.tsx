"use client"
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface TicketPurchaseProps {
  price: number
  ticketCount: number
  selectedNumbers: string[]
  handlePurchase: () => void
}


export function TicketPurchase({ ticketCount, price, handlePurchase }: TicketPurchaseProps) {
  
  const totalPrice = ticketCount * price

  return (
    <div className="w-full">
      <Button
        onClick={handlePurchase}
        className=" bg-green-500 text-white hover:bg-green-500/80 flex items-center justify-between gap-4 p-6 w-full"
      >
        <ShoppingCart className="w-8 h-8 p-1 bg-white rounded text-green-500" />
        <div className="text-sm font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPrice)}
        </div>
      </Button>
    </div>
  )
}

