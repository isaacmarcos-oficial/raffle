"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { ChevronUp, ChevronDown, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddPrizeModal from "./ticketPrizesAdd";
import EditPrizeModal from "./ticketPrizesEdit";
import { Badge } from "@/components/ui/badge";

type TicketPrizesProps = {
  campaign: CampaignType
  onUpdatePrizes?: (updatedCampaign: Partial<CampaignType>) => Promise<void>; // Torna opcional
}

export default function TabsPrizes({ campaign }: TicketPrizesProps) {
  const [prizes, setPrizes] = useState(campaign.prizes || []);

  useEffect(() => {
    setPrizes(campaign.prizes || []);
  }, [campaign.prizes]);

  // Função para mover prêmios para cima ou para baixo
  const movePrize = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === prizes.length - 1)
    ) {
      return; // Evita mover além dos limites
    }

    const updatedPrizes = [...prizes];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    // Troca a posição dos prêmios
    [updatedPrizes[index], updatedPrizes[swapIndex]] = [updatedPrizes[swapIndex], updatedPrizes[index]];

    setPrizes(updatedPrizes);
    savePrizeOrder(updatedPrizes);
  };

  // Atualiza a ordem dos prêmios no backend
  const savePrizeOrder = async (updatedPrizes: typeof prizes) => {
    try {
      const response = await fetch(`/api/campaign/${campaign.code}/prizes/order`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({
          prizes: updatedPrizes.map((prize, index) => ({
            id: prize.id,
            position: index + 1,
          })),
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar ordem dos prêmios");
      toast.success("Ordem dos prêmios atualizada!");
    } catch (error) {
      console.error("Erro ao atualizar ordem dos prêmios:", error);
      toast.error("Erro ao atualizar ordem dos prêmios.");
    }
  };

  const handleAddPrize = (prize: { title: string; description: string }) => {
    const newPrize = {
      id: Math.random().toString(36).substring(2), // ID aleatório (simulação)
      title: prize.title,
      description: prize.description,
      position: prizes.length + 1, // Garante que o novo prêmio tenha um position válido
    };

    setPrizes((prev) => [...prev, newPrize]); // Atualiza a lista mantendo os prêmios existentes
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
                <div className="flex gap-5">
                  <div className="flex flex-col justify-between items-center gap-2">
                    <Button size="sm" onClick={() => movePrize(index, "up")} disabled={index === 0}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => movePrize(index, "down")} disabled={index === prizes.length - 1}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center text-2xl font-bold text-green-500">
                    {index + 1}º
                  </div>
                  <div className="flex flex-col justify-center">
                    <CardHeader className="p-0">
                      <CardTitle>{prize.title}</CardTitle>
                      <CardDescription>{prize.description}</CardDescription>

                    </CardHeader>
                    {!prize.winnerNumber
                      ? <p className="text-yellow-500 font-semibold">Aguardando sorteio</p>
                      : <div className="flex items-center gap-2 text-base text-green-600 font-semibold">
                        <Badge className="flex text-sm items-center justify-center">
                          {prize.winnerNumber}
                        </Badge>
                        {prize.winnerName}
                      </div>
                    }
                    <div className="text-green-500 font-bold">

                    </div>
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