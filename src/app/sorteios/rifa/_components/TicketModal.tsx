"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey: string
  contactPhone: string
}

export default function TicketModal({ isOpen, onClose, pixKey, contactPhone }: TicketModalProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      toast.success('Texto copiado para a área de transferência');
    } catch (err) {
      toast.error('Falha ao copiar o texto');
      console.log(err)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserva Realizada!</DialogTitle>
          <DialogDescription>
            Parabéns! Sua reserva foi realizada com sucesso. Siga as instruções abaixo para concluir o pagamento e garantir sua participação:
          </DialogDescription>
        </DialogHeader>
        <Card className="my-4">
          <CardContent>
            <p className="font-semibold">Próximos Passos:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Efetue o pagamento para confirmar a sua participação através do pix
                <span className="text-green-500 font-bold cursor-pointer flex" onClick={copyToClipboard}>
                  {pixKey}<Copy className="ml-1 h-3 w-3" /> </ span>
              </li>
              <li>Entre em contato via <Link className="text-green-500 font-bold underline" href={`https://wa.me/${contactPhone}`} target="_blank">WhatsApp</Link>  informado na descrição para enviar o comprovante.</li>
            </ul>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button onClick={onClose}>Entendido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}