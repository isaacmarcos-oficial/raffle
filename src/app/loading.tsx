import { Loader2 } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-green-600">
      <div className="flex flex-col items-center justify-center text-center">
        <Loader2 className="w-16 h-16 animate-spin text-white mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Carregando o Sistema de Rifas</h1>
        <p className="text-lg text-white/80">Preparando sua sorte...</p>
      </div>
    </div>
  )
}