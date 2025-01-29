import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const code = await params;

  try {
    const prizes = await prisma.prize.findMany({
      where: { campaign: code },
    });

    return NextResponse.json(prizes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar prêmios:", error);
    return NextResponse.json({ error: "Erro interno ao buscar prêmios" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const code = await params;
  const { title } = await req.json();

  try {
    const campaign = await prisma.campaign.findUnique({ where: code });
    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    const prize = await prisma.prize.create({
      data: {
        title,
        campaignId: campaign.id,
      },
    });

    return NextResponse.json(prize, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar prêmio:", error);
    return NextResponse.json({ error: "Erro interno ao criar prêmio" }, { status: 500 });
  }
}

// PATCH: Atualiza um prêmio específico
export async function PATCH(req: Request) {
  const { id, winnerName, winnerNumber } = await req.json();

  // Validações iniciais
  if (!id || !winnerNumber || !winnerName) {
    return NextResponse.json(
      { error: "Os campos 'id', 'winnerName' e 'winnerNumber' são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    // Busca o prêmio para garantir que ele pertence a uma campanha
    const prize = await prisma.prize.findUnique({
      where: { id },
      include: { campaign: true }, // Obtém a campanha associada
    });

    if (!prize || !prize.campaign) {
      return NextResponse.json(
        { error: "Prêmio ou campanha não encontrados." },
        { status: 404 }
      );
    }

    // Agora buscamos o ticket corretamente, garantindo que seja da MESMA campanha do prêmio
    const ticket = await prisma.ticket.findFirst({
      where: { 
        numbers: { has: winnerNumber },
        campaignId: prize.campaign.id, // Filtra pela campanha correta
      },
      include: { buyer: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Número de ticket não encontrado na campanha correta." },
        { status: 404 }
      );
    }

    // Define o nome do vencedor (recipientName tem prioridade)
    const winnerName = ticket.recipientName || ticket.buyer?.name || "Desconhecido";

    // Atualiza o prêmio para associá-lo ao ticket
    const updatedPrize = await prisma.prize.update({
      where: { id },
      data: {
        ticketId: ticket.id,
        winnerNumber,
        winnerName
      },
    });

    return NextResponse.json(updatedPrize, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar prêmio:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar prêmio." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { }: { params: Promise<{ code: string }> }) {
  const { id } = await req.json();

  try {
    await prisma.prize.delete({ where: { id } });
    return NextResponse.json({ message: "Prêmio excluído com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir prêmio:", error);
    return NextResponse.json({ error: "Erro interno ao excluir prêmio" }, { status: 500 });
  }
}
