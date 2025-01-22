"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, DollarSign, UserCheck2 } from "lucide-react";
import { TicketForm } from "./Modal/TicketForm";
import { useState } from "react";
import { StepperSeparator, StepperTrigger } from "@/components/ui/stepper";
import PaymentType from "./Modal/TicketPaymentType";
import TicketInstruction from "./Modal/TicketInstruction";
import { toast } from "sonner";
import { TicketType } from "@/types/campaign";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey: string;
  contactPhone: string;
  selectedNumbers: string[];
  price: number;
  handlePurchase: (
    buyerName: string,
    recipientName: string,
    phone: string,
    paymentType: TicketType["paymentType"],
    selectedNumbers: string[]
  ) => void
  handleClose: () => void
}

type Step = {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  { step: 1, title: "Identificação", description: "Informe os dados do comprador", icon: <UserCheck2 size={16} /> },
  { step: 2, title: "Pagamento", description: "Efetue o pagamento", icon: <DollarSign size={16} /> },
  { step: 3, title: "Confirmação", description: "Finalize a compra", icon: <CheckCircle size={16} /> },
];

export default function TicketModal({ isOpen, onClose, pixKey, contactPhone, selectedNumbers, handlePurchase }: TicketModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [phone, setPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [paymentType, setPaymentType] = useState<TicketType['paymentType']>();

  const isCompleted = (step: number) => step < currentStep;
  const isActive = (step: number) => step === currentStep;

  const finalizePurchase = () => {
    if (!buyerName || !phone || !paymentType || selectedNumbers.length === 0) {
      toast.error("Todos os campos devem ser preenchidos!");
      return
    }
    handlePurchase(buyerName, recipientName, phone, paymentType, selectedNumbers);
    onClose(); // Fecha o modal após finalizar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          Falta pouco para finalizar
        </DialogTitle>

        {/* Stepper */}
        <div className="flex w-full items-center justify-between my-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex-1 flex flex-col items-center">
              {index > 0 && <StepperSeparator />}
              <StepperTrigger
                className={
                  isCompleted(step.step) ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-default" :
                    isActive(step.step) ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 cursor-default" :
                      "bg-gray-50 text-gray-500 hover:bg-gray-50 cursor-default"} >
                {isCompleted(step.step) ? (
                  step.icon
                ) : isActive(step.step) ? (
                  step.icon
                ) : (
                  step.icon
                )}
              </StepperTrigger>
            </div>
          ))}
        </div>

        {currentStep === 1 ? (
          <TicketForm
            recipientName={recipientName}
            buyer={buyerName}
            phone={phone}
            setRecipientName={setRecipientName}
            setBuyer={setBuyerName}
            setPhone={setPhone}
          />
        ) : currentStep === 2 ? (
          <PaymentType
            setPaymentType={setPaymentType}
            paymentType={paymentType}
          />
        ) : (
          <TicketInstruction
            contactPhone={contactPhone}
            pixKey={pixKey}
            paymentType={paymentType}
          />
        )}

        <DialogFooter className="flex justify-between w-full mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>
          {currentStep === steps.length ? (
            <Button type="submit" onClick={finalizePurchase}>
              Finalizar
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (currentStep === 1 && (!buyerName || !phone)) {
                  return toast.error("Preencha todos os campos de identificação!");
                }

                if (currentStep === 2 && !paymentType) {
                  return toast.error("Selecione o tipo de pagamento!");
                }

                setCurrentStep((prev) => Math.min(prev + 1, steps.length));
              }}
            >
              Continuar
            </Button>

          )}
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}