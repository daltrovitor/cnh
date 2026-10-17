const sharp = require('sharp');

async function main() {
  const { data, info } = await sharp('public/cnh-template-vertical.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // For specific data-value areas, find exact text bounds
  // We need to carefully separate LABEL text from DATA VALUE text
  
  // I know the field layout from the horizontal image:
  // After 90° CW rotation: orig(x,y) -> vert(691-y, x)
  // Original image was 955w x 692h, vertical is 692w x 955h
  
  // Let me find exactly where specific data values sit by scanning sub-regions
  
  function getPixel(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return [255, 255, 255];
    const i = (y * width + x) * channels;
    return [data[i], data[i+1], data[i+2]];
  }
  
  function isText(x, y) {
    const [r, g, b] = getPixel(x, y);
    if (r < 110 && g < 110 && b < 110) return 'black';
    if (r > 150 && g < 80 && b < 80) return 'red';
    return false;
  }
  
  function findTextBounds(x1, y1, x2, y2) {
    let minX = x2, maxX = x1, minY = y2, maxY = y1;
    let found = false;
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        if (isText(x, y)) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (!found) return null;
    return { 
      minX, minY, maxX, maxY,
      pctLeft: (minX / width * 100).toFixed(1),
      pctTop: (minY / height * 100).toFixed(1),
      pctRight: (maxX / width * 100).toFixed(1),
      pctBottom: (maxY / height * 100).toFixed(1),
      pctWidth: ((maxX - minX + 1) / width * 100).toFixed(1),
      pctHeight: ((maxY - minY + 1) / height * 100).toFixed(1),
    };
  }
  
  // Define DATA VALUE regions (not including labels)
  // The key challenge: each field has a small label AND a larger data value
  // In the vertical template, these are stacked horizontally (label on one side, value on other)
  
  // Let me examine the NAME field area more carefully
  // In horizontal image: name data "ODAIR ANTONIO FABIAN" is at roughly y=138-156, x=178-500
  // Vertical: x=691-156=535 to 691-138=553, y=178 to 500
  
  const fields = {
    // Name data value (separating from label)
    'Name_DataValue': { x1: 530, y1: 170, x2: 560, y2: 510 },
    'Name_Label': { x1: 540, y1: 160, x2: 575, y2: 510 },
    
    // 1a Habilitação data value
    // In horiz: approximately x=800-940, y=138-156
    // Vert: x=535-553, y=800-940
    '1aHab_DataValue': { x1: 530, y1: 790, x2: 560, y2: 945 },
    
    // Photo area in vertical
    // In horiz: x=35-265, y=180-530
    // Vert: x=691-530=161 to 691-180=511, y=35 to 265
    'Photo_Area': { x1: 155, y1: 30, x2: 515, y2: 270 },
    
    // Signature area 
    // In horiz: x=35-265, y=535-640
    // Vert: x=691-640=51 to 691-535=156, y=35 to 265
    'Signature_Area': { x1: 45, y1: 30, x2: 160, y2: 270 },
    
    // Data Nascimento data value
    // In horiz: x=270-940, y=195-225
    // Vert: x=691-225=466 to 691-195=496, y=270 to 940
    'DataNasc_DataValue': { x1: 460, y1: 260, x2: 500, y2: 945 },
    'DataNasc_Label': { x1: 490, y1: 260, x2: 520, y2: 500 },
    
    // Data Emissão data value
    // In horiz: x=270-510, y=260-290
    // Vert: x=691-290=401 to 691-260=431, y=270 to 510
    'DataEmissao_DataValue': { x1: 395, y1: 260, x2: 435, y2: 520 },
    'DataEmissao_Label': { x1: 425, y1: 260, x2: 465, y2: 520 },
    
    // Validade data value (red)
    // In horiz: x=510-720, y=260-290
    // Vert: x=401-431, y=510 to 720
    'Validade_DataValue': { x1: 395, y1: 510, x2: 435, y2: 725 },
    
    // ACC/D area
    // In horiz: x=720-940, y=260-300 approx
    'ACC_Area': { x1: 390, y1: 720, x2: 440, y2: 945 },
    
    // Doc Identidade data value
    // In horiz: x=270-940, y=325-360
    // Vert: x=691-360=331 to 691-325=366, y=270 to 940
    'DocIdent_DataValue': { x1: 325, y1: 260, x2: 370, y2: 945 },
    'DocIdent_Label': { x1: 355, y1: 260, x2: 420, y2: 500 },
    
    // CPF data value
    // In horiz: x=270-510, y=390-420
    // Vert: x=691-420=271 to 691-390=301, y=270 to 510
    'CPF_DataValue': { x1: 265, y1: 260, x2: 305, y2: 520 },
    'CPF_Label': { x1: 295, y1: 260, x2: 330, y2: 400 },
    
    // Nº Registro data value (red)
    // In horiz: x=510-720, y=390-420
    // Vert: x=271-301, y=510 to 720
    'NReg_DataValue': { x1: 265, y1: 510, x2: 305, y2: 725 },
    
    // CAT HAB data value (red)  
    // In horiz: x=720-940, y=390-420
    // Vert: x=271-301, y=720 to 940
    'CatHab_DataValue': { x1: 265, y1: 720, x2: 305, y2: 945 },
    
    // Nacionalidade data value
    // In horiz: x=270-940, y=460-490
    // Vert: x=691-490=201 to 691-460=231, y=270 to 940
    'Nacional_DataValue': { x1: 195, y1: 260, x2: 240, y2: 945 },
    'Nacional_Label': { x1: 225, y1: 260, x2: 260, y2: 500 },
    
    // Filiação line 1
    // In horiz: x=270-940, y=520-550
    // Vert: x=691-550=141 to 691-520=171, y=270 to 940
    'Filiacao1_DataValue': { x1: 135, y1: 260, x2: 175, y2: 945 },
    
    // Filiação line 2
    // In horiz: x=270-940, y=570-620
    // Vert: x=691-620=71 to 691-570=121, y=270 to 940
    'Filiacao2_DataValue': { x1: 65, y1: 260, x2: 125, y2: 945 },
    
    // Form number (vertical text on far left)
    // In horiz: x=0-30, y=350-600 approximately
    'FormNumber': { x1: 15, y1: 340, x2: 45, y2: 945 },
  };
  
  console.log('=== Data field positions in vertical template ===\n');
  for (const [name, region] of Object.entries(fields)) {
    const bounds = findTextBounds(region.x1, region.y1, region.x2, region.y2);
    if (bounds) {
      console.log(`${name}:`);
      console.log(`  Pixels: (${bounds.minX},${bounds.minY}) to (${bounds.maxX},${bounds.maxY})`);
      console.log(`  CSS: left:${bounds.pctLeft}% top:${bounds.pctTop}% width:${bounds.pctWidth}% height:${bounds.pctHeight}%`);
      console.log(`  For overlay: left:${bounds.pctLeft}% top:${bounds.pctTop}% right-edge:${bounds.pctRight}% bottom-edge:${bounds.pctBottom}%`);
    } else {
      console.log(`${name}: NO TEXT FOUND`);
    }
    console.log('');
  }
}

main().catch(console.error);
