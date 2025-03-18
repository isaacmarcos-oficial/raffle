"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface CampaignPaymentProps {
  campaignId: string;
}

export default function CampaignPayment({ campaignId }: CampaignPaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (type: "PAY_PER_CAMPAIGN" | "MONTHLY_SUBSCRIPTION") => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignId, type }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao iniciar pagamento");
      }

      // Redirecionar para o Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao iniciar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => handlePayment("PAY_PER_CAMPAIGN")}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600"
      >
        {loading ? "Processando..." : "Pagar por Campanha"}
      </Button>

      <Button
        onClick={() => handlePayment("MONTHLY_SUBSCRIPTION")}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600"
      >
        {loading ? "Processando..." : "Assinar Mensalidade"}
      </Button>
    </div>
  );
}
