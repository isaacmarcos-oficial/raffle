"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TicketType } from "@/types/campaign";

type ModalTicketsProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedTicket: TicketType | null;
};

export default function ticketsModal({
  modalOpen,
  setModalOpen,
  selectedTicket,
}: ModalTicketsProps) {
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => {
        setModalOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Números do Ticket</DialogTitle>
        </DialogHeader>
        {selectedTicket ? (
          <div>
            <ul className="flex flex-wrap gap-1">
              {selectedTicket.numbers.map((number: string) => (
                <li key={number} className="flex items-center">
                  <Badge>{number}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Nenhum ticket selecionado.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
