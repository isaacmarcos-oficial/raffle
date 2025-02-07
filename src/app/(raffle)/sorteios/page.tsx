"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/format"
import { CampaignType } from "@/types/campaign"
import { Calendar, Gift, LogIn, Ticket, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Raffles() {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("/api/campaign", {
          method: 'GET',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
          },
        });
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Erro ao carregar Campanhas:", error);
      } finally {
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      <main className="flex-1 py-6 px-4 min-h-screen max-w-[900px]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Campanhas disponíveis
            </h1>
          </div>
          <div className="flex md:flex-row gap-4 mb-8">
            <Input className="w-2/4" placeholder="Buscar Rifa" />
            <Select>
              <SelectTrigger className="w-1/4">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="raffle">Rifa</SelectItem>
                <SelectItem value="lottery">Sorteio</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-1/4">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="endDate">Data do sorteio</SelectItem>
                <SelectItem value="participants">Participantes</SelectItem>
                <SelectItem value="price">Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="gap-1 p-4">
                <CardHeader className="items-start gap-2 p-0">
                  <div className="flex w-full justify-between items-center">
                    <Badge className="border gap-1 items-center">
                      {campaign.type === "FIXED" ? (<Ticket className=" h-3 w-3" />) : campaign.type === "ALEATORY" ? (<Gift className=" h-3 w-3" />) : null}
                      {campaign.type}
                    </Badge>
                    <Badge className="bg-green-200 text-green-800 text-xs">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(campaign.price)}
                    </Badge>
                  </div>

                  <CardTitle className="text-md">
                    {campaign.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex w-full justify-between p-0 mt-2">
                  <div className="">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <p className="text-xs">
                        {formatDate(campaign.drawDate)}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Users className="h-4 w-4 mr-2" />
                      <p className="text-xs">{campaign.tickets?.length}</p>
                    </div>
                  </div>
                  <Link href={`/sorteios/${campaign.code}`}>
                    <Button size="icon" className="active:bg-green-500 ">
                      <LogIn className="h-6 w-6" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}