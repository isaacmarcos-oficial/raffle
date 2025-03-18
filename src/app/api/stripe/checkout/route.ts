import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { campaignId, type } = body;

    if (!campaignId || !type) {
      console.error("❌ campaignId ou type ausente!");
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const priceId =
      type === "PAY_PER_CAMPAIGN"
        ? "price_1R3g2RCtvdM2RnfEHsWut1CZ"
        : "price_1R3gkaCtvdM2RnfEgoohpmEs"; // ID da assinatura mensal no Stripe

    console.log("🟢 Criando sessão do Stripe...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: type === "PAY_PER_CAMPAIGN" ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/minhas-campanhas?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/minhas-campanhas?canceled=true`,
      metadata: { campaignId, type },
    });

    console.log("✅ Sessão criada! Stripe URL:", session.url);

    // 🛠️ Corrigindo retorno da API
    if (!session.url) {
      console.error("❌ Erro: `session.url` não foi gerado pelo Stripe.");
      return NextResponse.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
    }

    return NextResponse.json({ sessionUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao criar sessão do Stripe:", error);
    return NextResponse.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
  }
}
