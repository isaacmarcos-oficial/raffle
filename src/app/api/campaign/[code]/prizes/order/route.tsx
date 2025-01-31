import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise <{ code: string }> }) {
  try {
    const code = await params;
    const body = await req.json();

    if (!code || !body.prizes) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Atualiza a ordem dos prêmios
    const updates = body.prizes.map((prize: { id: string; position: number }) =>
      prisma.prize.update({
        where: { id: prize.id },
        data: { position: prize.position },
      })
    );

    await Promise.all(updates);

    return NextResponse.json({ message: "Ordem dos prêmios atualizada!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar ordem dos prêmios:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
