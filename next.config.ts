import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: o app inteiro roda no aparelho, sem servidor.
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
