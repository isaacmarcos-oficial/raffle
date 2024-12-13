import { Ticket } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Ticket className="h-8 w-8" />
      <span className="ml-2 text-2xl font-bold">Raffle</span>
    </div>
  )
}