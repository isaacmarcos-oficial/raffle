"use client"
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface TicketPurchaseProps {
  price: number
  ticketCount: number
}

export function TicketPurchase({ ticketCount, price }: TicketPurchaseProps) {

  const handlePurchase = () => {
    // Here you would implement the actual purchase logic
    alert(`Compra de ${ticketCount} bilhetes no valor de R$${(ticketCount * price).toFixed(2)},00`)
  }

  return (
    <div className="w-full">
      <Button
        onClick={handlePurchase}
        className=" bg-green-500 text-white hover:bg-green-500/80 flex items-center justify-between gap-4 p-6 w-full"
      >
        <ShoppingCart className="w-8 h-8 p-1 bg-white rounded text-green-500" />
          <div className="text-sm font-bold">R$ {(ticketCount * price).toFixed(2)}</div>
      </Button>
    </div>
  )
}

