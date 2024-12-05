import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
          <p className="text-xl text-foreground">Ops! Parece que você se perdeu no sorteio.</p>
          <div className="flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

