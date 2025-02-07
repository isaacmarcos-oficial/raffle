import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { status } = await req.json();
    const code =  await params;

    if (!code) {
      return NextResponse.json({ error: "ID da campanha é obrigatório." }, { status: 400 });
    }

    // Valida se o status é válido
    const validStatuses = ["DRAFT", "ACTIVE", "CANCELED", "FINISHED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 });
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
