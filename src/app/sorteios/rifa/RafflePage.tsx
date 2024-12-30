"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, Calendar, Users } from 'lucide-react';
import TicketsDrawer from './_components/TicketDrawer';
import { TicketGrid } from './_components/TicketGrid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { Campaign, Ticket as TicketType } from "@/types/campaign";
import { Button } from "@/components/ui/button";

export default function Rifa({ title, drawDate, description, quote, code, price }: Campaign) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const handlePurchase = async (buyerName: string, phone: string): Promise<void> => {
    if (selectedNumbers.length === 0) {
      toast.error("Nenhum número selecionado!");
      return;
    }

    try {
      console.log("Enviando números:", selectedNumbers); // Debug
      const response = await fetch(`/api/campaign/${code}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numbers: selectedNumbers,
          buyerName,
          phone,
          paid: false,
        }),
      });

      if (response.ok) {
        const savedTicket = await response.json();
        setTickets((prevTickets) => [...prevTickets, savedTicket]);
        setSelectedNumbers([]);
        toast.success("Compra realizada com sucesso!");
      } else {
        const errorMessage = await response.text();
        console.error("Erro da API:", errorMessage); // Mensagem da API
        toast.error("Erro ao finalizar a compra!");
      }
    } catch (error) {
      console.error("Erro ao processar a compra:", error);
      toast.error("Erro ao processar a compra.");
    }
  };

  const handleTicketSelect = (number: string) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers((prev) => [...prev, number]);
    }
  };

  const handleTicketRemove = (number: string) => {
    setSelectedNumbers((prev) => prev.filter((n) => n !== number));
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}/tickets`);

        if (response.ok) {
          const data = await response.json();
          console.log(data, "response");

          // Certifique-se de que `data` é uma matriz antes de defini-lo para o estado `tickets`
          if (Array.isArray(data.tickets)) {
            setTickets(data.tickets);
          } else {
            console.error("A API retornou dados em formato inesperado:", data);
          }
        } else {
          console.error("Erro ao buscar tickets.");
        }
      } catch (error) {
        console.error("Erro ao carregar tickets:", error);
      }
    };

    fetchTickets();
  }, [code]);


  return (
    <div className="min-h-screen">
      <main className="flex flex-col max-w-[1000px] container mx-auto p-4 gap-4">
        <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
          <div className=" w-full h-full flex items-center justify-center">
            IMAGEM EM BREVE
          </div>

          <div className="flex w-full py-2 px-4 justify-between items-center space-y-2 mt-auto">
            <h1 className="text-lg font-bold">{title}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <Banknote className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">
                  {price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <Calendar className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">
                  {format(new Date(drawDate), "dd/MM/yyyy", { locale: ptBR, })}
                </p>
              </div>
              <div className="flex items-center">
                <Users className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-xs">200</p>
              </div>
            </div>

          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className='flex flex-col gap-2'>
            <CardTitle>Total</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>{quote}</CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Vendidos</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>
              {
                tickets.reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)
              }
            </CardDescription>
          </Card>
          <Card className='flex flex-col gap-2'>
            <CardTitle>Disponíveis</CardTitle>
            <CardDescription className='font-bold text-2xl lg:text-3xl'>
              {
                quote - tickets.reduce((total, ticket) => total + (ticket.numbers?.length || 0), 0)
              }
            </CardDescription>
          </Card>
        </div>

        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="">
              Descrição/ Regulamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {description}
          </CardContent>
        </Card>

        <div className="flex w-full gap-6">
          <TicketGrid
            tickets={tickets}
            selectedNumbers={selectedNumbers}
            totalNumbers={quote}
            onTicketSelect={handleTicketSelect}
          />
        </div>

        <Card className='flex flex-col items-center justify-center'>
          <CardHeader>
            <CardTitle>
              Compartilhe:
            </CardTitle>
          </CardHeader>
          <CardContent className='flex gap-2'>
            <Button className=''>
              FB
            </Button>
            <Button className=''>
              IG
            </Button>
            <Button className=''>
              TG
            </Button>
            <Button className=''>
              X
            </Button>
          </CardContent>
        </Card>
      </main>

      <TicketsDrawer
        handlePurchase={(buyerName, phone) => handlePurchase(buyerName, phone)}
        price={price}
        selectedNumbers={selectedNumbers}
        onRemove={handleTicketRemove}
      />
    </div>
  );
}