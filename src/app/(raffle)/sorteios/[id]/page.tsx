import { CampaignType } from "@/types/campaign";
import RaffleAleatory from "./raffleAleatory";
import RaffleFixed from "./raffleFixed";

export default async function RafflePage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.id;

  if (!code) {
    return <div>Erro: Código da campanha não encontrado.</div>;
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/campaign/${code}`, {
      cache: "no-cache",
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Erro ao carregar campanha:", errorDetails);
      return (
        <div className="flex items-center justify-center w-screen h-screen text-2xl font-bold">
          Erro ao carregar a campanha
          {errorDetails && <pre>{JSON.stringify(errorDetails, null, 2)}</pre>}
        </div>
      );
    }

    const campaign: CampaignType = await response.json();

    if (!campaign || !campaign.type || campaign.status === "DRAFT") {
      return <div className="flex items-center justify-center w-screen h-screen text-2xl font-bold">Campanha não encontrada ou tipo inválido.</div>;
    }

    campaign.drawDate = new Date(campaign.drawDate);

    return campaign.type === "FIXED" ? (
      <RaffleFixed campaign={campaign} />
    ) : (
      <RaffleAleatory campaign={campaign} />
    );
    
  } catch (error) {
    console.error("Erro ao carregar os dados da API:", error);
    return <div>Erro ao carregar os dados da campanha.</div>;
  }
}
