import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateApiKey } from "@/middleware/validateApiKey";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    // Busca todas as campanhas no banco de dados
    const campaigns = await prisma.campaign.findMany({
      orderBy: { drawDate: "asc" },
      include: {
        owner: true,
        tickets: true,
        prizes: true
      }
    });

    // Retorna as campanhas no formato JSON
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar campanhas" },
      { status: 500 }
    );
  }
}

// Rota POST para criar campanhas
export async function POST(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    const body = await req.json();

    const {
      title,
      description,
      type,
      quote,
      minQuotes,
      digitLength,
      price,
      drawDate,
      pixCode,
      contactPhone,
      ownerId,
    } = body;

    // Validações
    if (!title || !description || !type || !price || !drawDate || !pixCode || !contactPhone || !ownerId) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes ou inválidos" },
        { status: 400 }
      );
    }

    // Validação específica para quote e minQuotes, dependendo do tipo da campanha
    if (type === "FIXED" && !quote) {
      return NextResponse.json(
        { error: "O campo 'quote' é obrigatório para campanhas do tipo FIXED" },
        { status: 400 }
      );
    }

    // Validação e conversão de drawDate
    const parsedDrawDate = new Date(drawDate);
    if (isNaN(parsedDrawDate.getTime())) {
      return NextResponse.json(
        { error: "Data de sorteio inválida" },
        { status: 400 }
      );
    }

    // Geração de um código único para a campanha
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Criação da campanha no banco de dados
    const newCampaign = await prisma.campaign.create({
      data: {
        code: generatedCode,
        title,
        description,
        type,
        quote: type === "FIXED" ? quote : 7,
        minQuotes: type === "ALEATORY" ? minQuotes : 5,
        price,
        digitLength: type === "ALEATORY" ? digitLength : 7,
        startDate: new Date(), // Data de início atual
        drawDate: parsedDrawDate, // Certifique-se de passar uma data válida
        pixCode,
        contactPhone,
        ownerId, // Relaciona ao proprietário
      },
    });

    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar campanha:", error);

    const errorDetails = error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      { error: "Erro interno ao criar campanha", details: errorDetails },
      { status: 500 }
    );
  }
}
