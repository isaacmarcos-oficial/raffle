import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignType } from "@/types/campaign";

interface ProgressCampaignProps {
  campaign: CampaignType;
}

export default function ProgressCampaign({ campaign }: ProgressCampaignProps) {
  const totalNumbersSold = campaign.tickets
    ? campaign.tickets
      .filter((ticket) => ticket.paid)
      .reduce((total, ticket) => total + ticket.numbers.length, 0)
    : 0;
  const progressPercentage = Math.min((totalNumbersSold / campaign.quote) * 100, 100);

  return (
    <Card className="w-full flex flex-col items center justify-between gap-4 font-semibold">
      <CardTitle className="">Progresso</CardTitle>
      <CardContent className="w-full flex items center justify-between gap-4 p-0">
        <Progress value={progressPercentage} className="mt-2" />
        <p className="text-green-500">{progressPercentage.toFixed(2)}%</p>
      </CardContent>
    </Card>
  )
}