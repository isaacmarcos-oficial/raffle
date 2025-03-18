import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { status } = await req.json();
    const code =  await params;

    if (!code) {
      return NextResponse.json({ error: "Código da campanha é obrigatório." }, { status: 400 });
    }

    // Verifica se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: code,
      select: { status: true, paid: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada." }, { status: 404 });
    }

    // Valida se o status é válido
    const validStatuses = ["DRAFT", "ACTIVE", "CANCELED", "FINISHED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    }

    // ❌ Bloqueia a ativação se a campanha não estiver paga
    if (status === "ACTIVE" && !campaign.paid) {
      return NextResponse.json({ error: "A campanha precisa ser paga antes de ser ativada." }, { status: 400 });
    }

    // Atualiza o status da campanha
    const updatedCampaign = await prisma.campaign.update({
      where: code,
      data: { status },
    });

    return NextResponse.json(updatedCampaign, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar status da campanha:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
