import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampaignType } from "@/types/campaign";
import { Share2 } from "lucide-react";
import Link from "next/link";

interface ShareCampaignProps {
  campaign: CampaignType
}

export default function ShareCampaign({campaign}: ShareCampaignProps) {
  return (
    <div className="flex justify-between px-4 w-full h-14 items-center">
      <Badge variant="outline" className="text-green-400 border-green-400">
        {campaign.owner.name}
      </Badge>
      <Link href="#share">
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
      </Link>
    </div>
  )
}