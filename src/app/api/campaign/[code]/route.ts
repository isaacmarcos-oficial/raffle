import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const code = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Código da campanha não fornecido" },
        { status: 400 }
      );
    }

    // Busca a campanha pelo código
    const campaign = await prisma.campaign.findUnique({
      where: code,
    });

    // Verifica se a campanha foi encontrada
    if (!campaign) {
      return NextResponse.json(
        { error: "Campanha não encontrada" },
        { status: 404 }
      );
    }

    // Retorna a campanha encontrada
    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanha:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar campanha" },
      { status: 500 }
    );
  }
}
