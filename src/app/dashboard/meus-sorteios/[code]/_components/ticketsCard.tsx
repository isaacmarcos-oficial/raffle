import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Ticket as TicketType } from "@/types/campaign";

export interface TabsTicketsProps {
  tickets: TicketType[];
}

export default function TicketsCard({ tickets }: TabsTicketsProps) {
  const totalTickets = tickets.length

  const totalPaidValue = tickets.reduce((total, ticket) => {
    if (ticket.paid) {
      return total + (ticket.numbers?.length || 0) * ticket.Campaign.price;
    }
    return total;
  }, 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className='flex flex-col gap-2'>
        <CardTitle>Compradores</CardTitle>
        <CardDescription className='font-bold text-2xl lg:text-3xl'>{totalTickets}</CardDescription>
      </Card>
      <Card className='flex flex-col gap-2'>
        <CardTitle>Pagamento confirmado</CardTitle>
        <CardDescription className='font-bold text-2xl lg:text-3xl'>
          {tickets.filter((ticket) => ticket.paid).length}
        </CardDescription>
      </Card>
      <Card>
        <CardTitle>Números Escolhidos</CardTitle>
        <CardDescription className='font-bold text-2xl lg:text-3xl'>
          {tickets.reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)}
        </CardDescription>
      </Card>

      <Card>
        <CardTitle>Números Confirmados</CardTitle>
        <CardDescription className='font-bold text-2xl lg:text-3xl'>
          {tickets
            .filter((ticket) => ticket.paid) // Filtrar apenas os tickets pagos
            .reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)}
        </CardDescription>
      </Card>

      <Card className='flex flex-col gap-2'>
        <CardTitle>Valor Pago</CardTitle>
        <CardDescription className='font-bold text-2xl lg:text-3xl'>
          {totalPaidValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </CardDescription>
      </Card>
    </div>
  )
}