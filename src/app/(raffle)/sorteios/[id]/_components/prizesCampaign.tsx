import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { Trophy } from "lucide-react";

type PrizeType = {
  campaign: CampaignType
}

export default function PrizesCampaign({ campaign }: PrizeType) {
  const sortedPrizes = [...campaign.prizes].sort((a, b) => a.position - b.position);

  return (
    <Card className="w-full flex-1 flex flex-col items center">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="">
          Prêmios
        </CardTitle>
      </CardHeader>

      <div className="flex flex-col gap-2">
        {sortedPrizes.map((prize) => (
          <Card key={prize.position} className="flex flex-col gap-2">
            <CardTitle className="flex items-center text-base">
              <Trophy className="text-green-500 h-4 w-4 mr-2" />
              {prize.title}
            </CardTitle>
            <CardContent>
              {prize.winnerNumber && <div className="text-green-600 font-semibold text-sm">
                  {prize.winnerNumber} |  {prize.winnerName}
                </div>
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  )
}