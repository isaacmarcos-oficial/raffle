'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight, CircleX, Minus, Plus } from 'lucide-react'

interface ticketsProps {
  ticketCount: number,
  onTicketChange: (count: number) => void
  price: number
}

export function TicketInput({ ticketCount, price,
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
      <Button onClick={reset} className='w-12 h-12 bg-gray-800 active:bg-green-500 text-white border-gray-700 hover:border-green-500'>
        <CircleX className='w-5 h-5' />
      </Button>
      <Button onClick={decrement} className='w-12 h-12 bg-gray-800 active:bg-green-500 text-white border-gray-700 hover:border-green-500'>
        <Minus />
      </Button>
      <Input
        id="ticketCount"
        type="number"
        min="1"
        value={ticketCount}
        onChange={handleInputChange}
        className="bg-gray-800 text-white border-gray-700 focus:border-green-500 text-center font-bold h-12"
      />
      <Button onClick={increment} className="w-12 h-12 bg-gray-800 active:bg-green-500 text-white border-gray-700 hover:border-green-500">
        <Plus />
      </Button>
    </div>
  )
}

