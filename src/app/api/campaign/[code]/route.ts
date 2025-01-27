import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateApiKey } from "@/middleware/validateApiKey";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    const code = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Código da campanha não fornecido" },
        { status: 400 }
      );
    }

    // Busca a campanha pelo código
    const campaign = await prisma.campaign.findUnique({
      where: code,
      include: {
        tickets: {
          include: {
            buyer: true,
            campaign: {
              select: {
                price: true,
                prizes: true
              },
            },
          }
        },
        owner: true,
        prizes: true
      }
    });

    // Verifica se a campanha foi encontrada
    if (!campaign) {
      return NextResponse.json(
        { error: "Campanha não encontrada" },
        { status: 404 }
      );
    }

    // Retorna a campanha encontrada
    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanha:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar campanha" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Código da campanha não fornecido" },
        { status: 400 }
      );
    }

    // Parseia o corpo da requisição
    const body = await request.json();

    // Valida o corpo da requisição
    const {
      title,
      description,
      type,
      quote,
      minQuotes,
      price,
      drawDate,
      pixCode,
      contactPhone,
      prizes
    } = body;

    // Atualiza os dados da campanha no banco de dados
    const updatedCampaign = await prisma.campaign.update({
      where: { code },
      data: {
        title,
        description,
        type,
        quote,
        minQuotes,
        price,
        drawDate: drawDate ? new Date(drawDate) : undefined, // Converte drawDate para Date
        pixCode,
        contactPhone,
        prizes: prizes
          ? {
            set: prizes.map((prizeId: string) => ({ id: prizeId })), // Atualiza os prêmios associados
          }
          : undefined,
      },
    });

    // Retorna a campanha atualizada
    return NextResponse.json(updatedCampaign, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar a campanha:", error);

    return NextResponse.json(
      { error: "Erro interno ao atualizar a campanha" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
