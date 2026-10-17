// Hello World
const sharp = require('sharp');

async function main() {
  const img = sharp('public/cnh-template-vertical.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  function getPixel(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return [0, 0, 0];
    const idx = (y * w + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }

  // Scan vertical columns around boxes:
  // Let's find border lines (black/dark green pixels, gray < 80)
  // Let's sample key regions:
  console.log('--- Scanning key landmarks in 692x955 ---');

  // Let's check photo rectangle:
  // In landscape: photo was x: 166-413 (h=247), y: 223-584 (w=361)
  // Rotated: rotX = 692 - oldY = 692 - 584 = 108 to 692 - 223 = 469
  // rotY = oldX = 166 to 413
  console.log('Approx photo: x: 108 to 469, y: 166 to 413');

  // Signature:
  // In landscape: signature was x: 166-413, y: 587-657 (h=70)
  // Rotated: rotX = 692 - 657 = 35 to 692 - 587 = 105
  // rotY = 166 to 413
  console.log('Approx signature: x: 35 to 105, y: 166 to 413');

  // Let's test specific crop regions and print bounding boxes of the text!
}

main();
