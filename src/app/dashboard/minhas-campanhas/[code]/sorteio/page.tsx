"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface Ticket {
  number: string;
  numbers: string[];
  name: string;
  recipientName?: string;
  phone: string;
  paid: boolean;
  buyer?: { name: string; phone: string };
}

interface Prize {
  id: string;
  title: string;
  description: string;
  winnerNumber?: string;
  winnerName?: string;
}

export default function SorteioPage() {
  const params = useParams<{ code: string }>()
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [currentNumber, setCurrentNumber] = useState("00");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([]);

  const code = params?.code

  // Carregar dados da campanha
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}`, {
          method: "GET",
          headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
        });

        if (response.ok) {
          const data = await response.json();

          const transformedTickets: Ticket[] = data.tickets
            .filter((ticket: Ticket) => ticket.paid === true)
            .flatMap((ticket: Ticket) =>
              ticket.numbers.map((number: string) => ({
                number,
                name: ticket.buyer?.name || "",
                recipientName: ticket.recipientName || "",
                phone: ticket.buyer?.phone || "",
              }))
            );
          setAvailableTickets(transformedTickets);
          setPrizes(data.prizes);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da campanha:", error);
        toast.error("Erro ao carregar dados da campanha");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignData();
  }, [code]);

  const assignPrizeToWinner = async (ticket: Ticket, prizeId?: string) => {
    if (!prizeId) {
      toast.error("Não há mais prêmios disponíveis.");
      return;
    }

    try {
      const payload = {
        id: prizeId,
        winnerNumber: ticket.number,
        winnerName: ticket.recipientName || ticket.name
      };

      const response = await fetch(`/api/campaign/${code}/prizes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setPrizes((prev) =>
          prev.map((prize) =>
            prize.id === prizeId
              ? { ...prize, winnerNumber: ticket.number, winnerName: ticket.recipientName || ticket.name }
              : prize
          )
        );

        // Remove o ticket sorteado dos disponíveis
        setAvailableTickets(prev => {
          const newAvailable = prev.filter(t => t.number !== ticket.number);
          return newAvailable;
        });

        toast.success(`Prêmio atribuído ao número ${ticket.number}!`);
      } else {
        throw new Error("Falha ao atribuir prêmio");
      }
    } catch (error) {
      console.error("Erro ao atribuir prêmio:", error);
      toast.error("Erro ao atribuir prêmio.");
    }
  };

  const startCountdown = () => {
    if (availableTickets.length === 0 || prizes.length === 0) {
      toast.error("Não há mais números disponíveis para sorteio!");
      return;
    }

    // Inicia o estado de contagem
    setIsCounting(true);
    setCountdown(10);
    let counter = 10;

    // Embaralha os números durante a contagem
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      setCurrentNumber(availableTickets[randomIndex].number);
    }, 100);

    // Contagem regressiva
    const countdownInterval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);

      if (counter <= 0) {
        // Limpa os intervalos
        clearInterval(animationInterval);
        clearInterval(countdownInterval);

        // Seleciona o vencedor aleatoriamente dos tickets disponíveis
        const randomIndex = Math.floor(Math.random() * availableTickets.length);
        const selectedTicket = availableTickets[randomIndex];

        if (selectedTicket) {
          // Atualiza o número mostrado
          setCurrentNumber(selectedTicket.number);

          // Encontra o primeiro prêmio disponível e atribui ao vencedor
          const currentPrizeIndex = prizes.findIndex((prize) => !prize.winnerNumber);
          if (currentPrizeIndex !== -1) {
            assignPrizeToWinner(selectedTicket, prizes[currentPrizeIndex]?.id);
          }
        }

        // Reseta estados de contagem
        setCountdown(null);
        setIsCounting(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-lg w-full my-auto mx-auto space-y-8">
        <Card className="flex flex-col items-center w-full">
          <CardHeader className="flex flex-col items-center gap-2">
            <PackageOpen className="w-12 h-12 text-green-500" />
            <CardTitle className="text-2xl">Boa sorte!</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Card className="w-full my-4 flex items-center justify-center p-8 bg-foreground">
              <motion.div
                key={currentNumber}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold tracking-[1.5rem] text-green-500 font-mono"
              >
                {countdown !== null ? countdown : currentNumber}
              </motion.div>
            </Card>

            <Button
              className="w-full p-6 text-lg bg-green-500 hover:bg-green-600"
              onClick={startCountdown}
              disabled={isCounting || availableTickets.length === 0 || !prizes.some(prize => !prize.winnerNumber)}
            >
              {isCounting ? "Sorteando!" : "Sortear"}
            </Button>

            {isLoading && (
              <div className="text-center mt-4">Carregando...</div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col w-full gap-4">
          {prizes.map((prize) => (
            <Card key={prize.id} className="w-full">
              <CardContent className="flex flex-col gap-2 p-4">
                <div className="font-bold text-lg">{prize.title}</div>
                {prize.winnerNumber ? (
                  <div className="flex items-center gap-2 text-lg text-green-600 font-semibold">
                    <Badge className="flex text-lg items-center justify-center">
                      {prize.winnerNumber}
                    </Badge>
                    {prize.winnerName}
                  </div>
                ) : (
                  <div className="text-yellow-500 font-semibold">Aguardando Sorteio...</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}