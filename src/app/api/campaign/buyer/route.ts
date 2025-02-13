import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateApiKey } from "@/middleware/validateApiKey";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "O parâmetro 'phone' é obrigatório." },
        { status: 400 }
      );
    }

    // Busca o comprador pelo telefone
    const phoneNormalized = phone.replace(/\D/g, '')
    const buyer = await prisma.buyer.findUnique({
      where: { phone: phoneNormalized },
      include: {
        tickets: {
          include: {
            campaign: true
          }
        },
      },
    });

    if (!buyer) {
      return NextResponse.json(
        { error: "Comprador não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(buyer, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar comprador:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar comprador." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

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