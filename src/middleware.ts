import { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth";

export function middleware(req: NextRequest) {
  return authMiddleware(req); // Reutilizando o middleware de autenticação
}

// Configurar os matchers para as rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
