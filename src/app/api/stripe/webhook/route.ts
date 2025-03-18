import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Assinatura do webhook ausente." }, { status: 400 });
  }

  let event;

  try {
    // 🛠️ Captura o corpo bruto corretamente
    const rawBody = await req.text();

    // 🛠️ Verifica a assinatura do webhook corretamente
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("❌ Erro na verificação do webhook:", err);
    return NextResponse.json({ error: "Falha na verificação da assinatura do webhook." }, { status: 400 });
  }

  // 🏆 Se o pagamento foi concluído, marque a campanha como paga
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { campaignId } = session.metadata || {};

    if (!campaignId) {
      return NextResponse.json({ error: "Metadados inválidos." }, { status: 400 });
    }

    try {
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { paid: true },
      });

      console.log(`✅ Campanha ${campaignId} marcada como paga.`);
      return NextResponse.json({ message: "Pagamento confirmado e campanha atualizada!" }, { status: 200 });
    } catch (error) {
      console.error("❌ Erro ao atualizar campanha:", error);
      return NextResponse.json({ error: "Erro ao atualizar campanha." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
