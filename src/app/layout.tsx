// Hello World
import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Fonte do aplicativo (tela de entrada e início), igual à do app oficial
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Fonte da impressão da CNH (sans humanista, semibold) — identificada por comparação com o documento
const cnhFont = Source_Sans_3({
  variable: "--font-cnh",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#19234e",
};

export const metadata: Metadata = {
  title: "CNH do Brasil",
  description: "Carteira Nacional de Habilitação (CNH) e Licenciamento (CRLV-e) Digital.",
  applicationName: "CNH do Brasil",
  appleWebApp: { capable: true, title: "CNH Brasil", statusBarStyle: "black-translucent" },
  icons: {
    icon: "/app-icon-brasil.png",
    apple: "/app-icon-brasil.png",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${poppins.variable} ${cnhFont.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-[#f8fafc] font-sans antialiased" suppressHydrationWarning>
        {children}
        <div className="rotate-guard" role="alert">
          Gire o aparelho para a vertical para continuar.
        </div>
      </body>
    </html>
  );
}
