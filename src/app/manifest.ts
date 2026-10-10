// Hello World
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CNH do Brasil",
    short_name: "CNH Brasil",
    description: "Carteira Nacional de Habilitação e Licenciamento Digital Oficial.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#19234e",
    theme_color: "#19234e",
    lang: "pt-BR",
    icons: [
      { src: "/app-icon-brasil.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/app-icon-brasil.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/app-icon-brasil.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
