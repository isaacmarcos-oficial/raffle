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
import { CampaignType } from "@/types/campaign";
import { useState } from "react";
import { toast } from "sonner";

type AddPrizeModalProps = {
  onAdd: (prize: { title: string; description: string }) => void;
  campaign: CampaignType
};

export default function AddPrizeModal({ onAdd, campaign }: AddPrizeModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`/api/campaign/${campaign.code}/prizes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ title, description }),
      });
  
      if (response.ok) {
        const newPrize = await response.json();
        onAdd(newPrize); // Atualiza a lista de prêmios no estado local
        setTitle("");
        setDescription("");
        toast.success("Prêmio adicionado com sucesso!");
      } else {
        toast.error("Erro ao adicionar prêmio.");
      }
    } catch (error) {
      console.error("Erro ao adicionar prêmio:", error);
      toast.error("Erro ao adicionar prêmio.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full p-6 bg-green-500 hover:bg-green-500/80 text-primary">
          Adicionar prêmio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Prêmio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Prêmio</Label>
            <Input
              id="title"
              placeholder="Ex: 1º Prêmio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Viagem para o Caribe"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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