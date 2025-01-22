import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/middleware/validateApiKey";

export async function POST(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  if (validationError) return validationError;

  try {
    const updatedTickets = await prisma.ticket.updateMany({
      data: {
        paymentType: "PIX_MANUAL",
      },
    });

    return NextResponse.json({
      message: `Tickets atualizados: ${updatedTickets.count}`,
    });
  } catch (error) {
    console.error("Erro ao atualizar tickets:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar tickets" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
