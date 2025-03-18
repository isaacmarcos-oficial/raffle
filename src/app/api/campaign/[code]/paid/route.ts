import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = await params;
  const { status } = await req.json();

  // Verifica se a campanha existe e se foi paga
  const campaign = await prisma.campaign.findUnique({ where: code });
  if (!campaign) return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });

  if (!campaign.paid) {
    return NextResponse.json({ error: "Pagamento pendente para ativação" }, { status: 400 });
  }

  // Atualiza status da campanha
  await prisma.campaign.update({
    where: code,
    data: { status },
  });

  return NextResponse.json({ message: `Status da campanha atualizado para ${status}` });
}
