import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Permitir acesso público a rotas específicas
  if (
    pathname.startsWith("/auth") || 
    pathname.startsWith("/api/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Redirecionamento de "/dashboard" para "/dashboard/minhas-campanhas"
  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/minhas-campanhas", req.url));
  }

  // Redirecionar se o usuário não estiver autenticado
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
