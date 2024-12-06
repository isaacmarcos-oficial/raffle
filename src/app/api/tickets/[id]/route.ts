import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Atualizar ticket (ex: marcar como pago)
export async function PATCH(req: Request) {
  try {
    const id = req.url.split("/").pop(); // Extrai o ID da URL
    const { paid } = await req.json();

    // Validação dos dados
    if (!id) {
      return NextResponse.json(
        { error: "O ID do bilhete é obrigatório" },
        { status: 400 }
      );
    }

    if (typeof paid !== "boolean") {
      return NextResponse.json(
        { error: "O campo 'pago' deve ser booleano" },
        { status: 400 }
      );
    }

    // Atualiza o ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: { paid },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    if (error.code === "P2025") {
      // Erro ao não encontrar o ticket
      return NextResponse.json(
        { error: "Bilhete não encontrado" },
        { status: 404 }
      );
    }

    console.error("Erro ao atualizar o bilhete:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar o bilhete" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Deletar ticket
export async function DELETE(req: Request) {
  try {
    const id = req.url.split("/").pop(); // Extrai o ID da URL

    // Validação do ID
    if (!id) {
      return NextResponse.json(
        { error: "O ID do bilhete é obrigatório" },
        { status: 400 }
      );
    }

    // Deleta o ticket
    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Bilhete excluído com sucesso" },
      { status: 200 }
    );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    if (error.code === "P2025") {
      // Erro ao não encontrar o ticket
      return NextResponse.json(
        { error: "Bilhete não encontrado" },
        { status: 404 }
      );
    }

    console.error("Erro ao excluir o bilhete:", error);
    return NextResponse.json(
      { error: "Falha ao excluir o bilhete" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}