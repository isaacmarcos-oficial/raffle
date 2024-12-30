'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, X } from "lucide-react";
import React, { useEffect, useState } from "react"
import { TicketForm } from "./TicketForm";

interface TicketsDrawerProps {
  handlePurchase: (buyerName: string, phone: string) => void;
  selectedNumbers: string[];
  onRemove: (number: string) => void;
  price: number;
}

export default function TicketsDrawer({ selectedNumbers, handlePurchase, onRemove, price }: TicketsDrawerProps) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (selectedNumbers.length === 0) {
      // Minimiza se não houver números selecionados
      setIsMinimized(true);
    } else {
      // Reabre ao selecionar um novo número
      setIsMinimized(false);
    }
  }, [selectedNumbers]);

  const handleNextStep = () => setCurrentStep(2);
  const handlePreviousStep = () => setCurrentStep(1);

  return (
    <div
      className={`fixed w-full md:w-80 bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all ${
        isMinimized ? "translate-y-full" : "translate-y-5"
      }`}
    >
      <Card className="w-full">
        <CardContent className="p-0 -mt-12 w-full">
          <CardHeader className="p-0 flex justify-between items-center">
            <Button
              variant="link"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-500"
            >
              <Minus className="absolute top-0 h-4 w-4" />
            </Button>
            <CardTitle className="text-lg font-bold">
              {currentStep === 1 ? "Números Selecionados" : "Finalizar Compra"}
            </CardTitle>
          </CardHeader>
          {!isMinimized && (
            <div className="mt-4">
              {currentStep === 1 ? (
                <>
                  {/* Etapa 1: Exibir números selecionados */}
                  <div className="grid grid-cols-5 flex-wrap gap-2">
                    {selectedNumbers.map((number) => (
                      <span
                        key={number}
                        className="p-2 flex items-center -pl-4 py-2 text-xs font-bold bg-green-500/10 text-green-500 rounded-md"
                      >
                        <span>{number}</span>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => onRemove(number)}
                          className="relative -ml-4 -top-4 -right-4 h-4 w-4 rounded-full hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handleNextStep}
                      disabled={selectedNumbers.length === 0}
                      className="w-full"
                    >
                      Prosseguir
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Etapa 2: Exibir formulário */}
                  <TicketForm
                    selectedNumbers={selectedNumbers}
                    price={price}
                    handlePurchase={handlePurchase}
                    onClose={handlePreviousStep}
                  />
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}