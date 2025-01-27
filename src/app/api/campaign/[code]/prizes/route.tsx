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
  const { title, description, value } = await req.json();

  try {
    const campaign = await prisma.campaign.findUnique({ where: code });
    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    const prize = await prisma.prize.create({
      data: {
        title,
        description,
        value: value || null,
        campaignId: campaign.id,
      },
    });

    return NextResponse.json(prize, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar prêmio:", error);
    return NextResponse.json({ error: "Erro interno ao criar prêmio" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { }: { params: Promise<{ code: string }> }) {
  const { id, title, description, value } = await req.json();

  try {
    const updatedPrize = await prisma.prize.update({
      where: { id },
      data: {
        title,
        description,
        value: value || null,
      },
    });

    return NextResponse.json(updatedPrize, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar prêmio:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar prêmio" }, { status: 500 });
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
