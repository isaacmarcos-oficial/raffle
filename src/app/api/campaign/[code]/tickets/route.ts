import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise <{ code: string }> }) {
  try {
    const {code: campaignCode} = await params;
    console.log("Parâmetros recebidos:", campaignCode);

    const { numbers, buyerName, phone, paid, purchaseDate } = await req.json();

    // Validação dos dados recebidos
    if (!Array.isArray(numbers) || numbers.length === 0 || !buyerName || !phone || typeof paid !== "boolean") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Verificar se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: { code: campaignCode},
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    // Verificar se os números já estão em uso na campanha
    const existingNumbers = await prisma.ticket.findMany({
      where: {
        campaignId: campaign.id,
        numbers: { hasSome: numbers }, // Verifica se algum número do array já existe
      },
      select: { numbers: true },
    });

    if (existingNumbers.length > 0) {
      const usedNumbers = existingNumbers.flatMap((ticket) => ticket.numbers);
      return NextResponse.json(
        { error: "Os seguintes números já estão em uso:", numbers: usedNumbers },
        { status: 409 }
      );
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

export async function GET(req: Request, { params }: { params: Promise <{ code: string }> }) {
  try {
    const { code: campaignCode } = await params;

    // Verificar se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: { code: campaignCode },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    // Buscar os tickets relacionados à campanha
    const tickets = await prisma.ticket.findMany({
      where: { campaignId: campaign.id },
    });

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar números:", error);
    return NextResponse.json({ error: "Erro interno ao buscar números" }, { status: 500 });
  }
}