import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";
import { CampaignType } from "@/types/campaign";

interface CampaignProps {
  campaign: CampaignType
}

export default function ShareCampaign({campaign}: CampaignProps) {
  return (
    <Card id="share" className='flex flex-col items-center justify-center'>
      <CardHeader>
        <CardTitle>
          Compartilhe:
        </CardTitle>
      </CardHeader>
      <CardContent className='flex gap-2'>
        <WhatsappShareButton
          url={`https://raffle.ignishub.com.br/sorteios/${campaign.code}`}
          title={`*${campaign.title}*\n\n${campaign.description}`}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <FacebookShareButton
          url={`https://raffle.ignishub.com.br/sorteios/${campaign.code}`}
          title={`${campaign.title}\n\n${campaign.description}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TelegramShareButton
          url={`https://raffle.ignishub.com.br/sorteios/${campaign.code}`}
          title={`${campaign.title}\n\n${campaign.description}`}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={`https://raffle.ignishub.com.br/sorteios/${campaign.code}`}
          title={`${campaign.title}\n\n${campaign.description}`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </CardContent>
    </Card>
  )
}