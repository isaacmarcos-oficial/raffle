import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateApiKey } from "@/middleware/validateApiKey";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Rota GET para buscar campanhas por owner
export async function GET(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  
  if (validationError) return validationError;

  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    // Verifica se o `ownerId` foi fornecido
    if (!ownerId) {
      return NextResponse.json(
        { error: "ownerId não foi fornecido" },
        { status: 400 }
      );
    }

    // Busca as campanhas associadas ao ownerId
    const campaigns = await prisma.campaign.findMany({
      where: { ownerId },
      include: {
        tickets: true
      }
    });

    // Verifica se há campanhas encontradas
    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma campanha encontrada para este owner" },
        { status: 404 }
      );
    }

    // Retorna as campanhas encontradas
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar campanhas por owner:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar campanhas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  
  if (validationError) return validationError;

  try {
    const { name, email, phone, password } = await req.json();

    // Validações básicas
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se o e-mail ou telefone já está registrado
    const existingUser = await prisma.owner.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail ou telefone já registrado." },
        { status: 400 }
      );
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await prisma.owner.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao registrar usuário." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const nextReq = req as unknown as NextRequest;
  const validationError = validateApiKey(nextReq);
  
  if (validationError) return validationError;

  try {
    const { id, name, email, phone, password } = await req.json();

    // Validações básicas
    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório." },
        { status: 400 }
      );
    }

    // Validações específicas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (email && !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "O e-mail fornecido é inválido." },
        { status: 400 }
      );
    }

    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "O telefone deve conter apenas números (10 a 15 dígitos)." },
        { status: 400 }
      );
    }

    // Criptografar a senha, se fornecida
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    // Atualiza o usuário no banco de dados
    const updatedUser = await prisma.owner.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar usuário." },
      { status: 500 }
    );
  }
}