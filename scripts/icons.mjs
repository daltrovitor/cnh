// Hello World
// Gera os ícones PNG do PWA a partir de public/icon.svg.
import sharp from "sharp";

const sizes = [
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["public/apple-touch-icon.png", 180],
  ["public/favicon.ico", 48],
];

for (const [file, size] of sizes) {
  await sharp("public/icon.svg").resize(size, size).png().toFile(file);
  console.log(`ok ${file}`);
}
