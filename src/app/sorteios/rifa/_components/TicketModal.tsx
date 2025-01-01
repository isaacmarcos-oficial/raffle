"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compra Realizada!</DialogTitle>
          <DialogDescription>
            Parabéns! Sua compra foi realizada com sucesso. Siga as instruções abaixo para concluir o pagamento e garantir sua participação:
          </DialogDescription>
        </DialogHeader>
        <Card className="my-4">
          <CardContent>
            <p className="font-semibold">Próximos Passos:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Efetue o pagamento para confirmar a sua participação através do pix na descrição</li>
              <li>Entre em contato via WhatsApp informado na descrição para enviar o comprovante.</li>
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