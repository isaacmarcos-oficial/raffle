import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const testUser = {
	id: "1",
	name: "John Doe",
	email: "admin@test.com",
	password: "qwe123",
};

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (
					credentials?.email === testUser.email &&
					credentials.password === testUser.password
				) {
					return testUser;
				}

				const res = await fetch("/api/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				});
				const user = await res.json();
				if (res.ok && user) {
					return user;
				}
				return null;
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		/**
		 * Callback chamado no login
		 * - Cria um novo `Owner` se o e-mail não existir no banco.
		 * - Caso o e-mail já exista, utiliza a conta existente.
		 */
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				try {
					const email = user.email ?? "";
					if (!email) {
						console.error("E-mail não encontrado no login social.");
						return false;
					}
					// Busca o Owner pelo e-mail
					let owner = await prisma.owner.findUnique({
						where: { email },
					});

					// Se não encontrar, cria um novo Owner
					if (!owner) {
						owner = await prisma.owner.create({
							data: {
								email: user.email ?? "",
								name: user.name ?? "Usuário sem nome",
								password: "", // Opcional, pois será um login social
								phone: "", // Placeholder (pode ser atualizado posteriormente)
							},
						});
					}

					return true; // Autoriza o login
				} catch (error) {
					console.error("Erro ao processar login social:", error);
					return false; // Bloqueia o login em caso de erro
				}
			}

			return true; // Autoriza outros métodos de login
		},

		/**
		 * Callback chamado ao criar a sessão do usuário.
		 * - Inclui o ID e outras informações do `Owner` na sessão.
		 */
		async session({ session }) {
			if (session.user?.email) {
				const owner = await prisma.owner.findUnique({
					where: { email: session.user.email },
				});

				if (owner) {
					session.user.id = owner.id;
					session.user.name = owner.name;
				}
			}
			return session;
		},
	},
	session: {
		strategy: "jwt", // Usamos JWT para persistir a sessão
	},
	pages: {
		signIn: "/login",
	},
};
