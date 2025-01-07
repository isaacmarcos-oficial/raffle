import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const updatedTickets = await prisma.ticket.updateMany({
      data: {
        PaymentType: "PIX_MANUAL",
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
