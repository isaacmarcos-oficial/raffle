"use client"
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignType } from "@/types/campaign";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CampaignsCard() {
  const { data: session } = useSession();
  const [data, setData] = useState<CampaignType[]>([]);

  useEffect(() => {
    async function fetchRaffles() {
      try {
        const response = await fetch(`/api/campaign/owner?ownerId=${session?.user.id}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro ao carregar rifas:", error);
      } finally {
      }
    }
    if (session?.user.id) {
      fetchRaffles();
    }
  }, [session?.user.id]);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
      {data.map((campaign) => {
        const totalNumbersSold = campaign.tickets
        ? campaign.tickets
          .filter((ticket) => ticket.paid) // Apenas tickets pagos
          .reduce((total, ticket) => total + ticket.numbers.length, 0)
        : 0;

        const progressPercentage = Math.min((totalNumbersSold / campaign.quote) * 100, 100);
        return (
          <Link href={`/dashboard/minhas-campanhas/${campaign.code}`} key={campaign.id}>
            <Card key={campaign.id} className="flex flex-col gap-2 p-4 hover:border-green-500 transition-all">
              <h3 className="text-lg font-bold">{campaign.title}</h3>
              <div className="flex justify-between">
                <p className="text-primary/50 text-xs">
                  /{campaign.code} | {campaign.quote} | {totalNumbersSold} |
                </p>
                <p className="text-base text-green-500 font-bold">
                  {(progressPercentage).toFixed(2)}%
                </p>
              </div>
              <Progress value={progressPercentage} />
            </Card>
          </Link>
        )
      })}
    </div>
  )
}