import { NextRequest, NextResponse } from "next/server";

export function validateApiKey(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return NextResponse.json(
      { error: "Chave de API inválida ou ausente" },
      { status: 403 }
    );
  }
  return null; // Permitir a requisição
}
