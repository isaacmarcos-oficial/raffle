import { cn } from "@/lib/utils"

interface LotteryNumber {
  id: number
  value: string
  status?: string
  winner?: string
}

interface LotteryListProps {
  numbers: LotteryNumber[]
}

export function LotteryList({ numbers }: LotteryListProps) {
  return (
    <div className="space-y-2">
      {numbers.map((number) => (
        <div
          key={number.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-lg",
            number.winner ? "bg-gray-800" : "hover:bg-gray-800/50"
          )}
        >
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">{number.id}</span>
            <span className="text-white">{number.value}</span>
          </div>
          <div>
            {number.winner ? (
              <span className="text-yellow-500">{number.winner}</span>
            ) : (
              <span className="text-green-400">Disponível</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
