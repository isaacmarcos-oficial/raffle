import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST (Criar um ticket)
export async function POST(req: Request) {
  try {
    const { number, buyer, phone, paid, purchaseDate } = await req.json();

    if (!number || !buyer || !phone || typeof paid !== "boolean") {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const newTicket = await prisma.ticket.create({
      data: {
        number,
        buyer,
        phone,
        paid,
        purchaseDate: new Date(purchaseDate),
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Failed to create ticket:", error);
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}

// Handle GET (Listar todos os tickets)
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany();
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}
