import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { Trophy } from "lucide-react";

type PrizeType = {
  campaign: CampaignType
}

export default function PrizesCampaign({ campaign }: PrizeType) {
  return (
    <Card className="w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="">
          Prêmios
        </CardTitle>
      </CardHeader>

      <CardHeader className="flex flex-col p-0 mb-4 gap-2">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {campaign.prizes.map((prize, index) => (
            <Card key={index} className="flex flex-col gap-2">
              <div className="flex items-center font-bold">
                <Trophy className="text-green-500 h-4 w-4 mr-2" />
                <p className="text-green-500">{index + 1}º Prêmio</p>
              </div>
              <CardTitle className="text-md">{prize.title}</CardTitle>
              <CardContent className="p-0">
                {!prize.winnerNumber
                  ? <p className="text-yellow-500 font-semibold text-sm">Aguardando sorteio</p>
                  : <div className="text-green-600 font-semibold text-sm">
                    {prize.winnerNumber} |  {prize.winnerName}
                  </div>
                }
              </CardContent>
            </Card>
          ))}
        </div>
      </CardHeader>
    </Card>
  )
}