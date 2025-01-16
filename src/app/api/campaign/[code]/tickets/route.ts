import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise <{ code: string }> }) {
  try {
    const {code: campaignCode} = await params;

    const { numbers, buyerName, phone, paid, purchaseDate, paymentType } = await req.json();

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
        paymentType,
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
      include: {
        buyer: true,
        campaign: true
      },
    });

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar números:", error);
    return NextResponse.json({ error: "Erro interno ao buscar números" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise <{ code: string }> }) {
  try {
    const { code: campaignCode } = await params;
    const { id: ticketId, paid } = await req.json();

    if (!ticketId || typeof paid !== "boolean") {
      return NextResponse.json(
        { error: "O campo 'id' é obrigatório e 'paid' deve ser um booleano" },
        { status: 400 }
      );
    }

    // Verificar se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: { code: campaignCode },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    // Verificar se o ticket existe na campanha
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        campaignId: campaign.id,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 });
    }

    // Atualizar o estado de pago
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { paid },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o ticket:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar o ticket" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise <{ code: string }> }) {
  try {
    const { code: campaignCode } = await params;
    const { id: ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: "O campo 'id' é obrigatório" }, { status: 400 });
    }

    // Verificar se a campanha existe
    const campaign = await prisma.campaign.findUnique({
      where: { code: campaignCode },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campanha não encontrada" }, { status: 404 });
    }

    // Verificar se o ticket existe na campanha
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        campaignId: campaign.id,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 });
    }

    // Deletar o ticket
    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json({ message: "Ticket deletado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar o ticket:", error);
    return NextResponse.json({ error: "Erro interno ao deletar o ticket" }, { status: 500 });
  }
}