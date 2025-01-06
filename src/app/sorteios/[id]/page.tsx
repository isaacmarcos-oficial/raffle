import Rifa from "../rifa/RafflePage";
import Lottery from "../titulo/page";
import { CampaignType } from "@/types/campaign";

export default async function RafflePage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.id;

  if (!code) {
    return <div>Erro: Código da campanha não encontrado.</div>;
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/campaign/${code}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Erro ao carregar campanha:", errorDetails);
      return (
        <div>
          Erro ao carregar a campanha
          {errorDetails && <pre>{JSON.stringify(errorDetails, null, 2)}</pre>}
        </div>
      );
    }

    const campaign: CampaignType = await response.json();

    if (!campaign || !campaign.type) {
      return <div>Campanha não encontrada ou tipo inválido.</div>;
    }

    campaign.drawDate = new Date(campaign.drawDate);

    return campaign.type === "FIXED" ? (
      <Rifa campaign={campaign} />
    ) : (
      <Lottery campaign={campaign} />
    );
  } catch (error) {
    console.error("Erro ao carregar os dados da API:", error);
    return <div>Erro ao carregar os dados da campanha.</div>;
  }
}
