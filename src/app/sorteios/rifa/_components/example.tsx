"use client";

import { useState } from "react";
import { Circle, MoreHorizontal, UserCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepperDescription, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper";

type Step = {
  step: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  { step: 1, title: "Step 1", description: "Description for Step 1" },
  { step: 2, title: "Step 2", description: "Description for Step 2" },
  { step: 3, title: "Step 3", description: "Description for Step 3" },
];

export default function Example() {
  const [currentStep, setCurrentStep] = useState(1);

  const isCompleted = (step: number) => step < currentStep;
  const isActive = (step: number) => step === currentStep;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.step} className="relative flex-1 flex flex-col items-center">
            {/* Separator */}
            {index > 0 && (
              <StepperSeparator/>
            )}

            {/* Trigger Button */}
            <StepperTrigger>
              {isCompleted(step.step) ? (
                <UserCheck2 size={16} />
              ) : isActive(step.step) ? (
                <Circle size={16} />
              ) : (
                <MoreHorizontal size={16} />
              )}
            </StepperTrigger>

            {/* Title & Description */}
            <div className="text-center mt-4">
              <StepperTitle>
                {step.title}
              </StepperTitle>
              <StepperDescription>
                {step.description}
              </StepperDescription>
            </div>
          </div>
        ))}
      </div>

      <div className="">
      {currentStep === 1 ? (
        <p>Conteudo da primeira etapa</p>
      ) : currentStep === 2 ? (
        <p>Conteudo da segunda etapa</p>
      ) : (
        <p>Conteudo da terceira etapa</p>
      )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          Voltar
        </Button>
        <Button
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
          disabled={currentStep === steps.length}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}