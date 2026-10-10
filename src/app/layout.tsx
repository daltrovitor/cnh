// Hello World
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
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
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-[#f8fafc] font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
