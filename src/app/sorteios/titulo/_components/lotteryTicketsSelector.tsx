'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

const priceOptions = [
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 300, label: '300' },
  { value: 400, label: '400' },
  { value: 500, label: '500' },
  { value: 600, label: '600' },
]

export function LotteryTicketsSelector({ onTicketsSelect }: { onTicketsSelect: (price: number) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Card className="flex items-center justify-center p-2 w-full rounded">
        <p className='font-bold antialiased '>
          Quanto mais títulos, mais chances de ganhar!
        </p>
      </Card>
      <div className="grid grid-cols-3 gap-2">
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
