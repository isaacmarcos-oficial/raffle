import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
        emailOrPhone: { label: "E-mail ou Telefone", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.emailOrPhone  || !credentials.password) {
          throw new Error("Email/telefone e senha são obrigatórios.");
        }

				const emailOrPhone = credentials.emailOrPhone;
        const isEmail = emailOrPhone.includes("@");

				const user = await prisma.owner.findFirst({
          where: isEmail
            ? { email: emailOrPhone }
            : { phone: emailOrPhone },
        });

				if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
						phone: user.phone
          };
        }

				throw new Error("Credenciais inválidas.");
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
                email,
                name: user.name || "Usuário sem nome",
                password: "", // Deixe em branco para login social
                phone: "", // Pode ser preenchido mais tarde
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
					session.user.email = owner.email;
					session.user.phone = owner.phone;
				}
			}
			return session;
		},

		async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
	},
	session: {
		strategy: "jwt", // Usamos JWT para persistir a sessão
	},
	pages: {
		signIn: "/auth",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
