"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PayCampaignButtonProps {
  campaignId: string;
  type: "PAY_PER_CAMPAIGN" | "MONTHLY_SUBSCRIPTION";
}

export default function PayCampaignButton({ campaignId, type }: PayCampaignButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    console.log("📤 Enviando payload para API:", { campaignId, type });

    try {
      setLoading(true);

      // ✅ Verificando se os parâmetros estão corretos antes de chamar a API
      if (!campaignId || !type) {
        console.error("❌ Erro: campaignId ou type não foram fornecidos.");
        toast.error("Erro: Dados inválidos para pagamento.");
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, type }),
      });

      console.log("🔵 Resposta recebida da API:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar sessão de pagamento");
      }

      const data = await response.json();
      console.log("✅ Sessão do Stripe criada:", data);

      if (data.sessionUrl) {
        console.log("🔗 Redirecionando para:", data.sessionUrl);
        window.location.href = data.sessionUrl;
      } else {
        console.error("❌ Erro: `sessionUrl` não foi retornado pela API.");
        toast.error("Erro ao processar pagamento.");
      }
    } catch (error) {
      console.error("❌ Erro no pagamento:", error);
      toast.error("Erro ao processar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full bg-green-500 hover:bg-green-600">
      {loading ? "Processando..." : "Pagar"}
    </Button>
  );
}