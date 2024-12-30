import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nome e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    // Verifica se o comprador já existe
    const existingBuyer = await prisma.buyer.findUnique({
      where: { phone },
    });

    if (existingBuyer) {
      return NextResponse.json(existingBuyer, { status: 200 });
    }

    // Cria um novo comprador
    const newBuyer = await prisma.buyer.create({
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(newBuyer, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar comprador:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar comprador" },
      { status: 500 }
    );
  }
}
