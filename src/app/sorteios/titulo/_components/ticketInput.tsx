'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleX, Minus, Plus } from 'lucide-react'

interface ticketsProps {
  ticketCount: number,
  onTicketChange: (count: number) => void
  price: number
}

export function TicketInput({ ticketCount,
  onTicketChange, }: ticketsProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    onTicketChange(isNaN(value) || value < 1 ? 1 : value)
  }

  const increment = () => {
    onTicketChange(ticketCount + 1)
  }

  const decrement = () => {
    onTicketChange(ticketCount > 1 ? ticketCount - 1 : 1)
  }

  const reset = () => {
    onTicketChange(1)
  }

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Button variant="outline" onClick={reset} className='w-12 h-12'>
        <CircleX className='w-5 h-5' />
      </Button>
      <Button variant="outline" onClick={decrement} className='w-12 h-12'>
        <Minus />
      </Button>
      <Input
        id="ticketCount"
        type="number"
        min="1"
        value={ticketCount}
        onChange={handleInputChange}
        className="text-center font-bold h-12"
      />
      <Button variant="outline" onClick={increment} className="w-12 h-12">
        <Plus />
      </Button>
    </div>
  )
}

