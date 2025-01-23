import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignType } from "@/types/campaign";

interface ProgressCampaignProps {
  campaign: CampaignType;
}

export default function ProgressCampaign({ campaign }: ProgressCampaignProps) {
  const progressValue = (campaign.tickets?.length || 0) / campaign.quote * 100;

  return (
    <Card className="w-full flex flex-col items center justify-between gap-4 font-semibold">
      <CardTitle className="">Progresso</CardTitle>
      <CardContent className="w-full flex items center justify-between gap-4 p-0">
        <Progress value={progressValue} className="mt-2" />
        <p>{progressValue.toFixed(2)}%</p>
      </CardContent>
    </Card>
  )
}