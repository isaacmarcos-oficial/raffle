import Rifa from "../rifa/page";
import Lottery from "../titulo/page";
import { raffles } from "@/app/api/tickets/raffles";

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  return raffles.map((raffle) => ({
    id: raffle.id.toString(),
  }));
}

export default function RafflePage({ params }: Params) {
  const raffle = raffles.find((r) => r.id === parseInt(params.id, 10));

  if (!raffle) {
    <div>
      Não foi possível encontrar as rifas
    </div> // Redireciona para a página 404 caso o ID não seja encontrado
  }

  return (
    raffle.type === "rifa" ? (
      <Rifa
        title={raffle.title}
        endDate={raffle.endDate}
        participants={raffle.participants}
        price={raffle.price}
      />
    ) : (
      <Lottery
        id={raffle.id}
        title={raffle.title}
        endDate={raffle.endDate}
        participants={raffle.participants}
        price={raffle.price}
      />
    )
  )
}