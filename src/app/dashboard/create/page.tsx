import { CreateRaffleForm } from "./_components/createRafleForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CampaignCreate() {
  return (
    <div className="flex w-full items-center justify-center">
      <main className="flex-1 py-6 px-4 min-h-screen max-w-[900px]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold ">Criar nova campanha</h1>
          </div>
          <Card>
            <CardContent>
              <CreateRaffleForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}