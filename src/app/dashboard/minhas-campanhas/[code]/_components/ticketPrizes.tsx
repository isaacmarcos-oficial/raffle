"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddPrizeModal from "./ticketPrizesAdd";
import EditPrizeModal from "./ticketPrizesEdit";

type TicketPrizesProps = {
  campaign: CampaignType
  onUpdatePrizes?: (updatedCampaign: Partial<CampaignType>) => Promise<void>; // Torna opcional
}

export default function TicketPrizes({ campaign }: TicketPrizesProps) {
  const [prizes, setPrizes] = useState(campaign.prizes || []);

  useEffect(() => {
    setPrizes(campaign.prizes || []);
  }, [campaign.prizes]);

  console.log(prizes)

  const handleAddPrize = (prize: { title: string; description: string }) => {
    const newPrize = {
      id: Math.random().toString(36).substring(2), // Gera um ID aleatório para simular
      ...prize,
    };
    setPrizes((prev) => [...prev, newPrize]);
    toast.success("Prêmio adicionado com sucesso!");
  };

  const handleEditPrize = async (updatedPrize: { id: string; title: string; description: string }) => {
    try {
      const response = await fetch(`/api/campaign/${campaign.code}/prizes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(updatedPrize),
      });

      if (response.ok) {
        setPrizes((prev) =>
          prev.map((prize) =>
            prize.id === updatedPrize.id ? { ...prize, ...updatedPrize } : prize
          )
        );
        toast.success("Prêmio atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar prêmio.");
      }
    } catch (error) {
      console.error("Erro ao atualizar prêmio:", error);
      toast.error("Erro ao atualizar prêmio.");
    }
  };

  const handleDeletePrize = async (prizeId: string) => {
    if (!confirm("Tem certeza que deseja excluir este prêmio?")) return;

    try {
      const response = await fetch(`/api/campaign/${campaign.code}/prizes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ id: prizeId }),
      });

      if (response.ok) {
        setPrizes((prev) => prev.filter((prize) => prize.id !== prizeId));
        toast.success("Prêmio excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir prêmio.");
      }
    } catch (error) {
      console.error("Erro ao excluir prêmio:", error);
      toast.error("Erro ao excluir prêmio.");
    }
  };

  return (
    <div>
      <AddPrizeModal campaign={campaign} onAdd={handleAddPrize} />
      <div className="space-y-4 mt-4">
        {prizes.length > 0 ? (
          prizes.map((prize, index) => (
            <Card key={prize.id}>
              <div className="flex justify-between items-center">
                <div className="">
                  <CardHeader className="p-0">
                    <CardTitle>{`${index + 1}º Prêmio - ${prize.title}`}</CardTitle>
                    <CardDescription>{prize.description}</CardDescription>

                  </CardHeader>
                  {!prize.winnerNumber
                    ? <p className="text-yellow-500 font-semibold">Aguardando sorteio</p>
                    : <div className="text-green-600 font-semibold">
                      Número Sorteado: {prize.winnerNumber} <br />
                      Ganhador: {prize.winnerName}
                    </div>
                  }
                  <div className="text-green-500 font-bold">

                  </div>
                </div>
                <div className="flex gap-4">
                  <EditPrizeModal campaign={campaign} prize={prize} onEdit={handleEditPrize} />

                  <Button
                    variant="link"
                    className="text-muted-foreground hover:text-red-500"
                    onClick={() => handleDeletePrize(prize.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">Nenhum prêmio cadastrado.</p>
        )}
      </div>
    </div>
  );
}