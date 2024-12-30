import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise <{ campaignCode: string }> }) {
  try {
    const { campaignCode } = await params;
    const { numbers, buyerName, phone, paid, purchaseDate } = await req.json();

    if (!Array.isArray(numbers) || numbers.length === 0 || !buyerName || !phone || typeof paid !== "boolean") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Verificar se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: { code: campaignCode },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    // Criar ou conectar o comprador
    let buyer = await prisma.buyer.findUnique({
      where: { phone },
    });

    if (!buyer) {
      buyer = await prisma.buyer.create({
        data: { name: buyerName, phone },
      });
    }

    // Criar o ticket associado
    const newTicket = await prisma.ticket.create({
      data: {
        numbers, // Array de números selecionados
        paid,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
        campaignId: campaign.id,
        buyerId: buyer.id,
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tickets:", error);
    return NextResponse.json({ error: "Erro interno ao criar tickets" }, { status: 500 });
  }
}
