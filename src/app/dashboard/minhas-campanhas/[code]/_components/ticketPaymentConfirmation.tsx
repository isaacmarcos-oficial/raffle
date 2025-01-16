import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { TicketType } from "@/types/campaign";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// PaymentConfirmationDialog.tsx
type PaymentConfirmationDialogProps = {
  ticketId: string;
  initialPaymentType: TicketType["paymentType"];
  onConfirm: (ticketId: string, paymentType: TicketType["paymentType"]) => void;
};

export default function TicketPaymentConfirmation({
  ticketId,
  initialPaymentType,
  onConfirm
}: PaymentConfirmationDialogProps) {
  const [selectedPayment, setSelectedPayment] = useState<TicketType["paymentType"]>(initialPaymentType);

  const handleConfirm = () => {
    if (!selectedPayment) {
      return toast.error("Selecione uma forma de pagamento!");
    }
    onConfirm(ticketId, selectedPayment);
    console.log(selectedPayment)
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <CheckCircle className="h-4 w-4 text-green-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirme a condição de pagamento:</AlertDialogTitle>
        <RadioGroup
          defaultValue={initialPaymentType}
          value={selectedPayment}
          onValueChange={(value) => setSelectedPayment(value as TicketType["paymentType"])}
          className="grid grid-cols-2 gap-2"
        >
          {[
            { value: "CASH", label: "Dinheiro" },
            { value: "PIX_MANUAL", label: "Pix" },
          ].map(({ value, label }) => (
            <Card
              key={value}
              className={`p-4 w-full cursor-pointer ${selectedPayment === value
                ? "border-green-500 bg-green-500/20 shadow-lg text-green-500"
                : ""
                }`}
            >
              <CardContent
                onClick={() => setSelectedPayment(value as TicketType["paymentType"])}
                className="flex p-0 items-center justify-center">
                {label}
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedPayment(initialPaymentType)}>Cancelar</AlertDialogCancel>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};