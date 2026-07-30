// @ts-nocheck
import qrcode from 'qrcode-generator';

/**
 * Real, scannable QR code rendered as an inline SVG string.
 * Uses the qrcode-generator library (error correction level M, auto type).
 */
export function generateQRCodeSvg(data: string, size = 120): string {
  const value = String(data ?? '').trim() || 'EDUMASTER';

  let qr: any = null;
  // Auto-select the smallest type number that fits the payload.
  for (let type = 1; type <= 40; type++) {
    try {
      const candidate = qrcode(type, 'M');
      candidate.addData(value);
      candidate.make();
      qr = candidate;
      break;
    } catch {
      // payload too long for this type, try the next one
    }
  }

  if (!qr) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#ffffff"/></svg>`;
  }

  const count = qr.getModuleCount();
  const quiet = 4; // required quiet zone for reliable scanning
  const total = count + quiet * 2;

  let path = '';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        path += `M${c + quiet},${r + quiet}h1v1h-1z`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="QR code">
    <rect width="${total}" height="${total}" fill="#ffffff"/>
    <path d="${path}" fill="#000000"/>
  </svg>`;
}

/** Returns a data URL of the QR SVG (useful for <img> / print engines). */
export function generateQRCodeDataUrl(data: string, size = 120): string {
  const svg = generateQRCodeSvg(data, size);
  const encoded = typeof window === 'undefined'
    ? Buffer.from(svg).toString('base64')
    : window.btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}

/* ---------------- Code 128 (subset B) barcode ---------------- */

const CODE128_PATTERNS = [
  '11011001100','11001101100','11001100110','10010011000','10010001100','10001001100','10011001000','10011000100','10001100100','11001001000',
  '11001000100','11000100100','10110011100','10011011100','10011001110','10111001100','10011101100','10011100110','11001110010','11001011100',
  '11001001110','11011100100','11001110100','11101101110','11101001100','11100101100','11100100110','11101100100','11100110100','11100110010',
  '11011011000','11011000110','11000110110','10100011000','10001011000','10001000110','10110001000','10001101000','10001100010','11010001000',
  '11000101000','11000100010','10110111000','10110001110','10001101110','10111011000','10111000110','10001110110','11101110110','11010001110',
  '11000101110','11011101000','11011100010','11011101110','11101011000','11101000110','11100010110','11101101000','11101100010','11100011010',
  '11101111010','11001000010','11110001010','10100110000','10100001100','10010110000','10010000110','10000101100','10000100110','10110010000',
  '10110000100','10011010000','10011000010','10000110100','10000110010','11000010010','11001010000','11110111010','11000010100','10001111010',
  '10100111100','10010111100','10010011110','10111100100','10011110100','10011110010','11110100100','11110010100','11110010010','11011011110',
  '11011110110','11110110110','10101111000','10100011110','10001011110','10111101000','10111100010','11110101000','11110100010','10111011110',
  '10111101110','11101011110','11110101110','11010000100','11010010000','11010011100','11000111010'
];
const CODE128_STOP = '1100011101011';

/** Real Code 128B barcode as an inline SVG string. */
export function generateBarcodeSvg(data: string, width = 180, height = 40): string {
  const value = String(data ?? '').replace(/[^\x20-\x7E]/g, '') || 'EDUMASTER';

  const codes = [104]; // Start B
  let checksum = 104;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i) - 32;
    codes.push(code);
    checksum += code * (i + 1);
  }
  codes.push(checksum % 103);

  let bits = codes.map(c => CODE128_PATTERNS[c] || CODE128_PATTERNS[0]).join('') + CODE128_STOP;

  const unit = width / bits.length;
  let bars = '';
  let x = 0;
  let i = 0;
  while (i < bits.length) {
    let run = 1;
    while (i + run < bits.length && bits[i + run] === bits[i]) run++;
    if (bits[i] === '1') {
      bars += `<rect x="${(x).toFixed(3)}" y="0" width="${(run * unit).toFixed(3)}" height="${height}" fill="#000000"/>`;
    }
    x += run * unit;
    i += run;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges" role="img" aria-label="Barcode ${value}">
    <rect width="${width}" height="${height}" fill="#ffffff"/>
    ${bars}
  </svg>`;
}
