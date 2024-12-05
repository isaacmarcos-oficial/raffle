import Rifa from "../rifa/page";
import Lottery from "../titulo/page";
import { raffles } from "@/app/api/tickets/raffles";

export default async function RafflePage({ params }: {params: Promise <{ id: string}>}) {
  const { id } = await params;
  const raffle = raffles.find((r) => r.id === Number(id));

  if (!raffle) return <div>Não foi possível encontrar as rifas</div>

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