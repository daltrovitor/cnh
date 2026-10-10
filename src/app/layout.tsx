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
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Campus Digital",
  description: "Carteirinha estudantil digital fictícia — projeto acadêmico.",
  applicationName: "Campus Digital",
  appleWebApp: { capable: true, title: "Campus", statusBarStyle: "default" },
  icons: { apple: "/apple-touch-icon.png" },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
