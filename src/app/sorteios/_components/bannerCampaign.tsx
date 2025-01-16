import { Card } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Banknote, Bookmark, Calendar, Users } from "lucide-react";

interface BannerCampaignProps {
  campaign: CampaignType
}

export default function BannerCampaign({campaign}: BannerCampaignProps) {
  return (
    <Card className='w-full p-0 h-[200px] flex flex-col items-center justify-center overflow-hidden'>
      <div className="bg-gradient-to-t from-green-500 to-green-600 w-full h-full flex items-center justify-center">
        {campaign.title && <h1 className="text-4xl font-bold uppercase text-white">{campaign.title}</h1>}
      </div>

      <div className="flex w-full py-2 px-4 justify-center items-center space-y-2 mt-auto">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <Bookmark className="text-green-500 h-4 w-4 mr-2" />
            <p className="text-xs">{campaign.code}</p>
          </div>
          <div className="flex items-center">
            <Banknote className="text-green-500 h-4 w-4 mr-2" />
            <p className="text-xs">
              {campaign.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="flex items-center">
            <Calendar className="text-green-500 h-4 w-4 mr-2" />
            <p className="text-xs">
              {format(new Date(campaign.drawDate), "dd/MM/yyyy", { locale: ptBR, })}
            </p>
          </div>
          <div className="flex items-center">
            <Users className="text-green-500 h-4 w-4 mr-2" />
            <p className="text-xs">{campaign.tickets?.length}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}