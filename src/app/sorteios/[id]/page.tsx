import Rifa from "../rifa/page";
import Lottery from "../titulo/page";

export default async function RafflePage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = await params;
  console.log("Parâmetros resolvidos:", resolvedParams);

  const code = resolvedParams.id;
  console.info("verificação do código:", code)

  if (!code) {
    return <div>Erro: Código da campanha não encontrado.</div>;
  }

  const response = await fetch(`${process.env.API_URL}/api/campaign/${code}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    return <div>Erro ao carregar a campanha
      {response.body && <pre>{JSON.stringify(await response.json(), null, 2)}</pre>}
    </div>;
  }

  const campaign = await response.json();

  if (!campaign) {
    return <div>Campanha não encontrada</div>;
  }

  return (
    campaign.type === "FIXED" ? (
      <Rifa
        title={campaign.title}
        description={campaign.description}
        price={campaign.price}
        drawDate={campaign.drawDate}
      />
    ) : (
      <Lottery
        title={campaign.title}
        description={campaign.description}
        price={campaign.price}
        drawDate={campaign.drawDate}
      />
    )
  )
}