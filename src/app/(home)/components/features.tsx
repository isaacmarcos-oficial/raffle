import { Card } from "@/components/ui/card";
import { Gift, Ticket, Users } from "lucide-react";

export default function Features() {
  return (
    <Card id="features" className="w-full flex py-12 md:py-24 lg:py-32 items-center justify-center">
      <div className="px-4 md:px-6 max-w-[1100px]">
        <h2 id="features" className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Funcionalidades
        </h2>
        <div className="grid gap-8 grid-cols md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Ticket className="h-12 w-12 mb-2" />
            <h3 className="text-xl font-bold">Rifa</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Crie rifas gerenciando cada número.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Gift className="h-12 w-12 mb-2" />
            <h3 className="text-xl font-bold">Sorteio</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Crie sorteios fácil de gerenciar.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Users className="h-12 w-12 mb-2" />
            <h3 className="text-xl font-bold">Facil participação</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Participe de sorteios com apenas alguns cliques e aumente suas chances de ganhar.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}