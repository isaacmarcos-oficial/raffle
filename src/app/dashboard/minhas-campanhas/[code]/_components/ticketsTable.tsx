"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Undo, X } from "lucide-react";
import { TicketType } from "@/types/campaign";
import { Badge } from "@/components/ui/badge";
import TicketPaymentConfirmation from "./ticketPaymentConfirmation";


type TabsTicketsProps = {
  tickets: TicketType[];
  handleApprove: (id: string, paymentType: TicketType["paymentType"]) => void;
  handleReject: (id: string) => void;
  handleUndo: (id: string, paymentType: TicketType["paymentType"]) => void;
  handleViewNumbers: (ticket: TicketType) => void;
};

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function TicketsTable({
  tickets,
  handleApprove,
  handleReject,
  handleUndo,
  handleViewNumbers,
}: TabsTicketsProps) {

  const renderTicketCard = (ticket: TicketType, isApproved: boolean) => (
    <Card key={ticket.id} className="mb-4">
      <CardContent className="flex w-full justify-between p-0">
        <div>
          <div className={`${isApproved ? "text-green-500" : "text-yellow-500"} font-semibold`}>
            {ticket.buyer?.name || "Sem comprador"}
            {ticket.recipientName && ` (${ticket.recipientName})`}
          </div>
          <div className="text-sm text-zinc-600">
            {ticket.buyer?.phone || "Sem telefone"}
          </div>
          <div className="flex text-xs gap-1 mt-2">
            <Badge>{ticket.numbers.length} Bilhetes</Badge>
            <Badge>{formatBRL(ticket.numbers.length * ticket.campaign.price)}</Badge>
            <Badge>{ticket.paymentType === "CASH" ? "DINHEIRO" : "PIX"}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => handleViewNumbers(ticket)}>
            <Eye className="h-4 w-4 text-gray-300" />
          </Button>
          {isApproved ? (
            <Button size="icon" variant="ghost" onClick={() => handleUndo(ticket.id, ticket.paymentType)}>
              <Undo className="h-4 w-4 text-yellow-500" />
            </Button>
          ) : (
            <TicketPaymentConfirmation
              ticketId={ticket.id}
              initialPaymentType={ticket.paymentType}
              onConfirm={handleApprove}
            />
          )}
          {!isApproved && (
            <Button size="icon" variant="ghost" onClick={() => handleReject(ticket.id)}>
              <X className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="approved">Aprovados</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        {tickets.filter((ticket) => !ticket.paid).map((ticket) => renderTicketCard(ticket, false))}
      </TabsContent>
      <TabsContent value="approved">
        {tickets.filter((ticket) => ticket.paid).map((ticket) => renderTicketCard(ticket, true))}
      </TabsContent>
    </Tabs>
  );
}
