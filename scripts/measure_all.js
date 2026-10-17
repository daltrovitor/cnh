// Hello World
const sharp = require('sharp');

async function measure() {
  const { data, info } = await sharp('public/cnh-template-vertical.png').raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;

  function isDark(x, y) {
    if (x < 0 || x >= W || y < 0 || y >= H) return false;
    const idx = (y * W + x) * 3;
    const g = (data[idx] + data[idx+1] + data[idx+2]) / 3;
    return g < 130;
  }

  // Find exact inner bounding boxes for all fields:
  // In 692 x 955:
  const boxes = {
    nome: { x1: 472, y1: 215, x2: 512, y2: 772 },
    hab1: { x1: 472, y1: 780, x2: 512, y2: 940 },
    photo: { x1: 108, y1: 166, x2: 470, y2: 414 },
    signature: { x1: 34, y1: 166, x2: 105, y2: 414 },
    mirrorNumber: { x1: 28, y1: 546, x2: 60, y2: 915 },
    nascimento: { x1: 418, y1: 430, x2: 452, y2: 938 },
    emissao: { x1: 364, y1: 430, x2: 398, y2: 596 },
    validade: { x1: 364, y1: 608, x2: 398, y2: 768 },
    categoriaD: { x1: 364, y1: 885, x2: 405, y2: 925 },
    docIdentidade: { x1: 310, y1: 430, x2: 344, y2: 938 },
    cpf: { x1: 254, y1: 430, x2: 288, y2: 618 },
    registro: { x1: 254, y1: 630, x2: 288, y2: 800 },
    catHab: { x1: 254, y1: 812, x2: 288, y2: 938 },
    nacionalidade: { x1: 200, y1: 430, x2: 234, y2: 938 },
    filiacao1: { x1: 140, y1: 430, x2: 180, y2: 938 },
    filiacao2: { x1: 75, y1: 430, x2: 115, y2: 938 },
    filiacaoTotal: { x1: 65, y1: 430, x2: 185, y2: 938 },
  };

  console.log('--- PERCENTAGES FOR 692x955 ---');
  for (const [name, b] of Object.entries(boxes)) {
    const leftPct = ((b.x1 / W) * 100).toFixed(2);
    const topPct = ((b.y1 / H) * 100).toFixed(2);
    const widthPct = (((b.x2 - b.x1) / W) * 100).toFixed(2);
    const heightPct = (((b.y2 - b.y1) / H) * 100).toFixed(2);
    console.log(`${name}: { left: "${leftPct}%", top: "${topPct}%", width: "${widthPct}%", height: "${heightPct}%" }`);
  }
}

measure();
