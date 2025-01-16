'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

const priceOptions = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 100, label: '100' },
  { value: 1000, label: '1000' },
  { value: 5000, label: '5000' },
  { value: 10000, label: '10000' },
  { value: 20000, label: '20000' },
]

export function LotteryTicketsSelector({ onTicketsSelect }: { onTicketsSelect: (price: number) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className='flex items-center justify-center font-bold antialiased'>
        Selecione a quantidade de cotas
      </div>
      <div className="grid grid-cols-4 gap-2">
        {priceOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            onClick={() => onTicketsSelect(option.value)}
            className={cn(
              "h-16 text-lg font-semibold",
              option.value === 200 && "border-green-500 text-green-500 hover:bg-green-500/10"
            )}
          >
            <Plus className='h-4 w-4 text-green-500' />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
