import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Session } from "next-auth";
import SessionProviderClientComponent from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";


export const metadata: Metadata = {
  title: "RAFFLE | O seu sorteio facilitado com o Raffle",
  description: "Crie e participe de rifas e sorteio emocionantes. Sua chance de ganhar muito espera!",
};


export default async function RootLayout({
  children, session
}: Readonly<{
  children: React.ReactNode;
  session: Session | null
}>) {

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderClientComponent session={session}>
            <SidebarProvider>
              <AppSidebar/>
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                {children}
                <Footer />
                <Toaster />
              </div>
            </SidebarProvider>
          </SessionProviderClientComponent>
        </ThemeProvider>
      </body>
    </html >
  );
}
