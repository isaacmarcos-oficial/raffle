import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST (Criar um ticket)
export async function POST(req: Request) {
  try {
    const { number, buyerName, phone, paid, purchaseDate, raffleId } = await req.json();

    if (!number || !buyerName || !phone || typeof paid !== "boolean" || !raffleId) {
      return NextResponse.json(
        { error: "Campos ausentes ou inválidos" },
        { status: 400 }
      );
    }

    // Verifica se a Raffle existe
    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
    });

    if (!raffle) {
      return NextResponse.json({ error: "Sorteio não encontrado" }, { status: 404 });
    }

    // Verifica se o número já está associado a outro ticket na mesma rifa
    const existingTicket = await prisma.ticket.findFirst({
      where: {
        number,
        raffleId,
      },
    });

    if (existingTicket) {
      return NextResponse.json(
        { error: "Número já sorteado para este sorteio" },
        { status: 409 }
      );
    }

    // Verifica se o comprador já existe
    let buyer = await prisma.buyer.findUnique({
      where: { phone },
    });

    // Se não existir, cria o comprador
    if (!buyer) {
      buyer = await prisma.buyer.create({
        data: {
          name: buyerName,
          phone,
        },
      });
    }

    // Cria o ticket associado ao comprador e à rifa
    const newTicket = await prisma.ticket.create({
      data: {
        number,
        paid,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
        raffleId,
        buyerId: buyer.id, // Relaciona ao comprador
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Falha ao gerar bilhete:", error);
    return NextResponse.json({ error: "Falha ao gerar bilhete" }, { status: 500 });
  }
}

// Handle GET (Listar todos os tickets)
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        buyer: true, // Inclui os dados do comprador
        Raffle: true, // Inclui os dados da rifa
      },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Falha ao buscar bilhetes:", error);
    return NextResponse.json({ error: "Falha ao buscar bilhetes" }, { status: 500 });
  }
}
