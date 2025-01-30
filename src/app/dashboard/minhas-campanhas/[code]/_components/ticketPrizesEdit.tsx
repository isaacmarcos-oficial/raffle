"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampaignType, PrizeType } from "@/types/campaign";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AddPrizeModalProps = {
  prize: PrizeType;
  onEdit: (updatedPrize: PrizeType) => void;
  campaign: CampaignType
};

export default function EditPrizeModal({ prize, onEdit, campaign }: AddPrizeModalProps) {
  const [title, setTitle] = useState(prize.title);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("O título não pode estar vazio!");
      return;
    }

    try {
      const response = await fetch(`/api/campaign/${campaign.code}/prizes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ id: prize.id, title }),
      });

      if (response.ok) {
        const updatedPrize = await response.json();
        onEdit(updatedPrize); // Atualiza o estado com o prêmio editado
        toast.success("Prêmio atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar o prêmio.");
      }
    } catch (error) {
      console.error("Erro ao atualizar prêmio:", error);
      toast.error("Erro ao atualizar prêmio.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-muted-foreground hover:text-yellow-500"
        >
          <Pencil className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Prêmio</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="title">Título do Prêmio</Label>
          <Input
            id="title"
            placeholder="Ex: 1º Prêmio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-green-500 hover:bg-green-500/80"
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}