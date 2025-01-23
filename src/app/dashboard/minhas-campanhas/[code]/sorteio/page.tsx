"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { PackageOpen } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

interface Ticket {
  number: string;
  name: string;
  recipientName?: string;
  phone: string;
}

interface APIResponseTicket {
  numbers: string[];
  buyer?: {
    name: string;
    phone: string;
  };
  recipientName?: string;
}

export default function SorteioPage() {
  const params = useParams<{ code: string }>()
  const [shuffledTickets, setShuffledTickets] = useState<Ticket[]>([]);
  const [currentNumber, setCurrentNumber] = useState("10");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Ticket[]>([]);
  const [showName, setShowName] = useState<string | null>(null);

  const code = params?.code

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array: Ticket[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/campaign/${code}`, {
          method: "GET",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (response.ok) {
          const data = await response.json();

          const transformedTickets: Ticket[] = data.tickets.flatMap((ticket: APIResponseTicket) =>
            ticket.numbers.map((number: string) => ({
              number,
              name: ticket.buyer?.name || "",
              recipientName: ticket.recipientName || "",
              phone: ticket.buyer?.phone || "",
            }))
          );

          setShuffledTickets(shuffleArray(transformedTickets));
        } else {
          console.error("Erro ao buscar tickets.");
        }
      } catch (error) {
        console.error("Erro ao carregar tickets:", error);
      }
    };

    fetchTickets();
  }, [code]);

  const startCountdown = () => {
    if (shuffledTickets.length === 0) return;

    setIsCounting(true);
    setCountdown(10);
    let counter = 10;

    const intervalId = setInterval(() => {
      counter -= 1;
      setCountdown(counter);

      // Mostra números embaralhados durante a contagem
      setCurrentNumber((prev) => {
        const currentIndex = shuffledTickets.findIndex((ticket) => ticket.number === prev);
        const nextIndex = (currentIndex + 1) % shuffledTickets.length;
        return shuffledTickets[nextIndex]?.number || "Boa sorte!";
      });

      // Finaliza o sorteio
      if (counter <= 0) {
        clearInterval(intervalId);

        const selectedTicket = shuffledTickets[0];
        if (selectedTicket) {
          setCurrentNumber(selectedTicket.number);
          setSelectedCards((prev) => [...prev, selectedTicket]);
          setShuffledTickets((prev) => prev.slice(1)); // Remove o número sorteado da lista
        }

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
              disabled={isCounting || shuffledTickets.length === 0}
            >
              {isCounting ? "Sorteando!" : "Sortear"}
            </Button>
          </CardContent>
        </Card>

        {/* Selected Numbers Grid */}
        <div className="flex flex-col w-full gap-4">
          {selectedCards.map((ticket, index) => (
            <Card
              key={index}
              onClick={() => setShowName(ticket.number)}
              className="w-full items-center cursor-pointer transform hover:scale-105 transition-transform"
            >
              <CardContent className="flex w-full items-center justify-between p-0">
                <div className="font-semibold">
                  {index + 1}º Prêmio
                </div>
                <div className="flex gap-4 justify-between items-center p-0 text-lg text-center text-green-600 font-semibold">
                  <div className="flex flex-col">
                    <p>{ticket.number}</p>
                    {showName === ticket.number && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary"
                      >
                        {ticket.recipientName ? ticket.recipientName : ticket.name}

                        {ticket.recipientName ?
                          (
                            <p className="text-xs text-primary/50 font-thin">
                              {ticket.name}
                            </p>
                          ) : null
                        }
                      </motion.div>
                    )}
                  </div>
                  <Link href={`https://wa.me/${ticket.phone}`}  target="_blank">
                    <Button size="icon" className="p-2 hover:scale-110 transition-all">
                      <FaWhatsapp className="w-8 h-8 text-green-600" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}