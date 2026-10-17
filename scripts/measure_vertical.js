const sharp = require('sharp');

async function main() {
  const { data, info } = await sharp('public/cnh-template-vertical.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image: ${width}x${height}, ${channels}ch`);

  function isText(x, y) {
    const i = (y * width + x) * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Black text
    if (r < 110 && g < 110 && b < 110) return 'black';
    // Red text
    if (r > 150 && g < 80 && b < 80) return 'red';
    return false;
  }

  // Count text pixels per column x
  const colCounts = [];
  for (let x = 0; x < width; x++) {
    let count = 0;
    for (let y = 100; y < height - 30; y++) {
      if (isText(x, y)) count++;
    }
    colCounts.push(count);
  }

  // Find column bands with text
  let bands = [];
  let inBand = false, bandStart = 0;
  for (let x = 0; x < width; x++) {
    if (colCounts[x] > 8 && !inBand) { inBand = true; bandStart = x; }
    else if (colCounts[x] <= 8 && inBand) {
      inBand = false;
      if (x - bandStart > 3) bands.push({ start: bandStart, end: x - 1 });
    }
  }
  if (inBand) bands.push({ start: bandStart, end: width - 1 });

  console.log('\n=== Column bands with text ===');
  for (const b of bands) {
    console.log(`  x=${b.start}-${b.end} (${(b.start/width*100).toFixed(1)}%-${(b.end/width*100).toFixed(1)}%) w=${b.end-b.start+1}px`);
  }

  // For each band, find text segments along y
  console.log('\n=== Text segments per band ===');
  for (const band of bands) {
    if (band.end - band.start < 4) continue;

    let segments = [];
    let inSeg = false, segStart = 0;
    let hasRed = false;

    for (let y = 0; y < height; y++) {
      let found = false;
      let redFound = false;
      for (let x = band.start; x <= band.end; x++) {
        const t = isText(x, y);
        if (t) { found = true; if (t === 'red') redFound = true; }
      }
      if (found && !inSeg) { inSeg = true; segStart = y; hasRed = redFound; }
      else if (found && inSeg && redFound) hasRed = true;
      else if (!found && inSeg) {
        inSeg = false;
        if (y - segStart > 3) {
          segments.push({ start: segStart, end: y - 1, red: hasRed });
        }
        hasRed = false;
      }
    }
    if (inSeg && height - segStart > 3) segments.push({ start: segStart, end: height - 1, red: hasRed });

    // Merge segments that are very close (< 4px gap)
    const merged = [];
    for (const seg of segments) {
      if (merged.length > 0 && seg.start - merged[merged.length - 1].end < 5) {
        merged[merged.length - 1].end = seg.end;
        if (seg.red) merged[merged.length - 1].red = true;
      } else {
        merged.push({ ...seg });
      }
    }

    console.log(`\nBand x=${band.start}-${band.end} (left:${(band.start/width*100).toFixed(1)}% w:${((band.end-band.start+1)/width*100).toFixed(1)}%):`);
    for (const seg of merged) {
      const color = seg.red ? ' [RED]' : '';
      console.log(`  y=${seg.start}-${seg.end} (top:${(seg.start/height*100).toFixed(1)}% h:${((seg.end-seg.start+1)/height*100).toFixed(1)}%) len=${seg.end-seg.start+1}px${color}`);
    }
  }

  // Also sample the background color in a few spots
  console.log('\n=== Background color samples ===');
  const spots = [[350, 300], [400, 400], [300, 500], [200, 600]];
  for (const [x, y] of spots) {
    const i = (y * width + x) * channels;
    console.log(`  (${x},${y}): rgb(${data[i]}, ${data[i+1]}, ${data[i+2]})`);
  }
}

main().catch(console.error);
