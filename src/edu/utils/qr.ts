// @ts-nocheck
// Helper to generate quick QR code SVG string for student ID and payment cards
export function generateQRCodeSvg(data: string, size = 120): string {
  // Simple clean SVG representation with encoded data blocks
  const hash = data.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rows = 9;
  const cols = 9;
  const cellSize = size / rows;
  
  let rects = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Corners position detection patterns
      const isTopLeftCorner = r < 3 && c < 3;
      const isTopRightCorner = r < 3 && c >= cols - 3;
      const isBottomLeftCorner = r >= rows - 3 && c < 3;
      
      const isCornerPattern = isTopLeftCorner || isTopRightCorner || isBottomLeftCorner;
      
      // Pseudo-random dark cells based on data hash
      const isDark = isCornerPattern || ((r * 7 + c * 13 + hash) % 3 === 0);

      if (isDark) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize - 0.5}" height="${cellSize - 0.5}" fill="#0f172a" rx="1"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="rounded-lg bg-white p-1 border border-slate-200">
    <rect width="${size}" height="${size}" fill="#ffffff"/>
    ${rects}
  </svg>`;
}

export function generateBarcodeSvg(data: string, width = 180, height = 40): string {
  const barsCount = 30;
  const barWidth = width / barsCount;
  let bars = '';
  
  for (let i = 0; i < barsCount; i++) {
    const isThick = (i * 3 + data.length) % 2 === 0;
    const isSpacer = i % 7 === 0;
    if (!isSpacer) {
      bars += `<rect x="${i * barWidth}" y="0" width="${isThick ? barWidth * 0.8 : barWidth * 0.4}" height="${height}" fill="#0f172a"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#ffffff"/>
    ${bars}
  </svg>`;
}