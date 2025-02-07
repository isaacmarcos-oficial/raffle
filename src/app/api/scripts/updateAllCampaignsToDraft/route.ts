import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/middleware/validateApiKey";

export async function POST(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    const updatedCampaigns = await prisma.campaign.updateMany({
      data: {
        status: "DRAFT",
      },
    });

    return NextResponse.json({
      message: `Campanhas atualizadas: ${updatedCampaigns.count}`,
    });
  } catch (error) {
    console.error("Erro ao atualizar as campanhas:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar as campanhas" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
