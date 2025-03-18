import { Button } from "@/components/ui/button";
import { CampaignType } from "@/types/campaign";
import { toast } from "sonner";

interface CampaignActionsProps {
  campaign: CampaignType;
  onUpdateStatus: (status: "DRAFT" | "ACTIVE" | "FINISHED" | "CANCELED") => Promise<void>;
}

export default function CampaignActions({
  campaign,
  onUpdateStatus,
}: CampaignActionsProps) {

  const handleStatusChange = async (newStatus: "ACTIVE" | "FINISHED" | "CANCELED") => {
    try {
      // Bloqueia ativação se a campanha não estiver paga
      if (newStatus === "ACTIVE" && !campaign.paid) {
        toast.error("A campanha precisa ser paga antes de ser ativada.");
        return;
      }

      await onUpdateStatus(newStatus);
      toast.success(`Status atualizado para: ${newStatus}`);
    } catch (error) {
      console.error("❌ Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status.");
    }
  };

  return (
    <div className="flex gap-2">
      {/* Se a campanha estiver em DRAFT */}
      {campaign.status === "DRAFT" && (
        <>
          <Button
            size={"sm"}
            onClick={() => handleStatusChange("ACTIVE")}
            className="bg-green-500"
          >
            Publicar
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => handleStatusChange("CANCELED")}
            className="font-bold"
          >
            Cancelar
          </Button>
        </>
      )}

      {/* Se a campanha estiver ativa */}
      {campaign.status === "ACTIVE" && (
        <>
          <Button
            onClick={() => handleStatusChange("FINISHED")}
            className="bg-blue-500"
          >
            Finalizar
          </Button>
          <Button
            onClick={() => handleStatusChange("CANCELED")}
            className="bg-red-500"
          >
            Cancelar
          </Button>
        </>
      )}

      {/* Se a campanha estiver finalizada ou cancelada */}
      {(campaign.status === "FINISHED" || campaign.status === "CANCELED") && (
        <Button disabled className="bg-gray-400 cursor-not-allowed">
          Campanha {campaign.status === "FINISHED" ? "Finalizada" : "Cancelada"}
        </Button>
      )}
    </div>
  );
}
