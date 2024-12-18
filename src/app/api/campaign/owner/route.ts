import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Rota GET para buscar campanhas por owner
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get("ownerId");

    // Verifica se o `ownerId` foi fornecido
    if (!ownerId) {
      return NextResponse.json(
        { error: "ownerId não foi fornecido" },
        { status: 400 }
      );
    }

    // Busca as campanhas associadas ao ownerId
    const campaigns = await prisma.campaign.findMany({
      where: { ownerId },
    });

    // Verifica se há campanhas encontradas
    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma campanha encontrada para este owner" },
        { status: 404 }
      );
    }

    // Retorna as campanhas encontradas
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanhas por owner:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar campanhas" },
      { status: 500 }
    );
  }
}
