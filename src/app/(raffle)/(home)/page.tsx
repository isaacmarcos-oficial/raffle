import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Features from "./components/features";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <main className="flex-1 items-center justify-center ">
        <section className="flex w-full py-12 md:py-24 lg:py-32 xl:py-48 items-center justify-center">
          <div className="flex items-center justify-center container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none light:text-green-500">
                  O seu sorteio facilitado com o Raffle
                </h1>
                <p className="mx-auto max-w-[500px] text-zinc-300 md:text-xl dark:text-zinc-400">
                  Crie e participe de rifas e sorteio emocionantes. Sua chance de ganhar muito espera!
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard/create">
                    Criar sorteio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/campanhas">Ver campanhas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Features/>

        <section className="flex flex-col w-full py-12 md:py-24 lg:py-32">
          <div className="flex px-4 md:px-6">
            <div className="w-full flex flex-col items-center gap-4 text-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pronto para começar?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Crie seu próprio sorteio ou navegue pelos existentes. Sua próxima grande vitória pode estar a apenas um clique de distância!
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard/create">Criar campanha</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/campanhas">Ver Campanhas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}