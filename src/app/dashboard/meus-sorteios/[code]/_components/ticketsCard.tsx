import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Ticket as TicketType } from "@/types/campaign";

export interface TabsTicketsProps {
  tickets: TicketType[];
}

export default function TicketsCard({ tickets }: TabsTicketsProps) {
  const totalTickets = tickets.length

    return(
      <div className="grid grid-cols-3 gap-4">
        <Card className='flex flex-col gap-2'>
          <CardTitle>Compradores</CardTitle>
          <CardDescription className='font-bold text-2xl lg:text-3xl'>{totalTickets}</CardDescription>
        </Card>
        <Card className='flex flex-col gap-2'>
          <CardTitle>Vendidos</CardTitle>
          <CardDescription className='font-bold text-2xl lg:text-3xl'>
            {tickets.filter((ticket) => ticket.paid).length}
          </CardDescription>
        </Card>
        <Card className='flex flex-col gap-2'>
          <CardTitle>Valor Pago</CardTitle>
          <CardDescription className='font-bold text-2xl lg:text-3xl'>
          </CardDescription>
        </Card>
      </div>
    )
}