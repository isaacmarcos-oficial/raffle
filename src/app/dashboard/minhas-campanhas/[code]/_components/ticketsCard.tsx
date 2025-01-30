import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";

export interface TabsTicketsProps {
  campaign: CampaignType;
}

export default function TicketsCard({ campaign }: TabsTicketsProps) {
  const totalTickets = campaign.tickets?.length;

  const totalPaidValue = campaign.tickets?.reduce((total, ticket) => {
    if (ticket.paid) {
      return total + (ticket.numbers?.length || 0) * campaign.price;
    }
    return total;
  }, 0);

  const totalUnPaidValue = campaign.tickets?.reduce((total, ticket) => {
    if (!ticket.paid) {
      return total + (ticket.numbers?.length || 0) * campaign.price;
    }
    return total;
  }, 0);

  const pixManualTotal = campaign.tickets?.reduce((total, ticket) => {
    if (ticket.paid && ticket.paymentType === "PIX_MANUAL") {
      return total + (ticket.numbers?.length || 0) * campaign.price;
    }
    return total;
  }, 0);

  const cashTotal = campaign.tickets?.reduce((total, ticket) => {
    if (ticket.paid && ticket.paymentType === "CASH") {
      return total + (ticket.numbers?.length || 0) * campaign.price;
    }
    return total;
  }, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex md:flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle>Compras</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl">
            {totalTickets}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex md:flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle>Compras confirmadas</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl">
            {campaign.tickets?.filter((ticket) => ticket.paid).length}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex md:flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle>Números Escolhidos</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl">
            {campaign.tickets?.reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex md:flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle>Números Confirmados</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl">
            {campaign.tickets
              ?.filter((ticket) => ticket.paid)
              .reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle className="text-center">Total confirmados</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl text-green-500">
            {totalPaidValue?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle className="text-center">Total pendentes</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl text-yellow-500">
            {totalUnPaidValue?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex flex-col gap-2 p-0 w-full justify-between items-center">
          <CardTitle className="text-center">PIX</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl text-green-500">
            {pixManualTotal?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="flex md:flex-col gap-2 p-4">
        <CardContent className="flex flex-col gap-2  p-0 w-full justify-between items-center">
          <CardTitle className="text-center">Dinheiro</CardTitle>
          <CardDescription className="font-bold text-lg md:text-xl text-green-500">
            {cashTotal?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
