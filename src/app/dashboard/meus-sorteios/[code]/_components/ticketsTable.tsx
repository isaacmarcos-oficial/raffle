"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Eye, Undo, X } from "lucide-react";
import { TicketType } from "@/types/campaign";
import { Badge } from "@/components/ui/badge";

type TabsTicketsProps = {
  tickets: TicketType[];
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  handleUndo: (id: string) => void;
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

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="approved">Aprovados</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" >
        {tickets
          .filter((ticket) => ticket.paid === false)
          .sort((a, b) => (a.buyer?.name || "").localeCompare(b.buyer?.name || ""))
          .map((ticket) => (
            <Card key={ticket.id} className="mb-4">
              <CardContent className="flex w-full justify-between p-0">
                <div >
                  <div className="">
                    <p className="text-indigo-500 font-semibold">
                      {ticket.buyer?.name || "Sem comprador"}
                    </p>
                    <p className="text-foreground text-sm">
                      <strong>Contato:</strong> {ticket.buyer?.phone || "Sem Telefone"}
                    </p>
                  </div>
                  <div className="flex text-xs gap-1 mt-1">
                    <Badge>{ticket.numbers.length} Bilhetes</Badge>
                    <Badge>
                      {formatBRL(ticket.numbers.length * ticket.Campaign.price)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleViewNumbers(ticket)}
                  >
                    <Eye className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleApprove(ticket.id)}>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleReject(ticket.id)}>
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>

      <TabsContent value="approved">
        {tickets
          .filter((ticket) => ticket.paid === true)
          .sort((a, b) => (a.buyer.name || "").localeCompare(b.buyer.name || ""))
          .map((ticket) => (
            <Card key={ticket.id} className="mb-4">
              <CardContent className="flex w-full justify-between p-0">
                <div>
                  <p className="text-indigo-500 font-semibold">
                    {ticket.buyer.name || "Sem comprador"}
                  </p>
                  <div className="flex text-xs gap-1">
                    <Badge>{ticket.numbers.length} Bilhetes</Badge>
                    <Badge>
                      {formatBRL(ticket.numbers.length * ticket.Campaign.price)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleViewNumbers(ticket)}
                  >
                    <Eye className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleUndo(ticket.id)}>
                    <Undo className="h-4 w-4 text-yellow-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  );
}
