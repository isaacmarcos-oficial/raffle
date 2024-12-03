import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Ticket, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  O seu sorteio facilitado com o Raffle
                </h1>
                <p className="mx-auto max-w-[500px] text-zinc-300 md:text-xl dark:text-zinc-400">
                  Crie e participe de rifas e sorteio emocionantes. Sua chance de ganhar muito espera!
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/create">
                    Criar sorteio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sorteios">Ver sorteios</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full flex py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 items-center justify-center">
          <div className="container px-4 md:px-6 max-w-[1100px]">
            <h2 id="features" className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Funcionalidades</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pronto para começar?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Crie seu próprio sorteio ou navegue pelos existentes. Sua próxima grande vitória pode estar a apenas um clique de distância!
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/create">Criar sorteio</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sorteios">Ver sorteios</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}