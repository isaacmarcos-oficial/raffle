import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "IGNIS HUB | Transformando ideias em realidade digital",
  description: "Desenvolvemos sistemas e sites web personalizados para impulsionar seu negócio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/ignishub.png" sizes="any" />
      </head>
      <body
        className="antialiased"
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
