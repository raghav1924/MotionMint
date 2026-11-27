/**
 * Converts an inline SVG DOM element into a 2D Euclidean Distance Field (EDF)
 * packed into an RGBA Uint8Array texture for WebGL shaders.
 *
 * Channel layout:
 * - R: normalized unsigned distance from the logo silhouette (0 = on/inside logo, 255 = far)
 * - G: antialiased logo alpha mask (255 = inside logo, 0 = outside)
 * - B: soft-falloff distance glow (255 = inside/near logo, 0 = far)
 * - A: 255
 */

export interface LogoSdfTextureData {
  size: number;
  data: Uint8Array;
}

const INF = 1e9;

/**
 * Exact 2D Euclidean Distance Transform (Meijster et al., 2000) in O(W * H).
 */
export function computeEuclideanDistanceField(
  mask: Uint8Array,
  width: number,
  height: number
): Float32Array {
  const g = new Float32Array(width * height);

  // Phase 1: vertical scan per column
  for (let x = 0; x < width; x++) {
    g[x] = mask[x] ? 0 : INF;
    for (let y = 1; y < height; y++) {
      const idx = y * width + x;
      g[idx] = mask[idx] ? 0 : Math.min(INF, g[(y - 1) * width + x] + 1);
    }
    for (let y = height - 2; y >= 0; y--) {
      const idx = y * width + x;
      const below = g[(y + 1) * width + x];
      if (below + 1 < g[idx]) {
        g[idx] = below + 1;
      }
    }
  }

  // Phase 2: horizontal parabolic envelope per row
  const dist = new Float32Array(width * height);
  const s = new Int32Array(width);
  const t = new Int32Array(width);

  const f = (x: number, i: number, rowOffset: number) => {
    const gi = g[rowOffset + i];
    if (gi >= INF * 0.5) return INF;
    return (x - i) * (x - i) + gi * gi;
  };

  const sep = (i: number, u: number, rowOffset: number) => {
    const gi = g[rowOffset + i];
    const gu = g[rowOffset + u];
    return Math.floor((u * u - i * i + gu * gu - gi * gi) / (2 * (u - i)));
  };

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    let q = 0;
    s[0] = 0;
    t[0] = 0;

    for (let u = 1; u < width; u++) {
      if (g[rowOffset + u] >= INF * 0.5) continue;
      while (q >= 0 && f(t[q], s[q], rowOffset) > f(t[q], u, rowOffset)) {
        q--;
      }
      if (q < 0) {
        q = 0;
        s[0] = u;
        t[0] = 0;
      } else {
        const w = 1 + sep(s[q], u, rowOffset);
        if (w < width) {
          q++;
          s[q] = u;
          t[q] = w;
        }
      }
    }

    for (let u = width - 1; u >= 0; u--) {
      const dSq = f(u, s[q], rowOffset);
      dist[rowOffset + u] = dSq >= INF * 0.5 ? width : Math.sqrt(dSq);
      if (u === t[q]) q--;
    }
  }

  return dist;
}

export function buildSdfFromAlpha(
  alpha: Uint8Array,
  size: number
): LogoSdfTextureData {
  const binary = new Uint8Array(size * size);
  let hasAnyPixel = false;
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] > 96) {
      binary[i] = 1;
      hasAnyPixel = true;
    }
  }

  const out = new Uint8Array(size * size * 4);
  if (!hasAnyPixel) {
    // Fallback centered radial SDF if SVG was empty
    const half = size * 0.5;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x - half) / half;
        const dy = (y - half) / half;
        const d = Math.min(1, Math.sqrt(dx * dx + dy * dy));
        const idx = (y * size + x) * 4;
        out[idx] = Math.round(d * 255);
        out[idx + 1] = 0;
        out[idx + 2] = Math.round(Math.exp(-d * 3.5) * 255);
        out[idx + 3] = 255;
      }
    }
    return { size, data: out };
  }

  const dist = computeEuclideanDistanceField(binary, size, size);
  const maxDist = size * 0.42;

  for (let i = 0; i < size * size; i++) {
    const dNorm = Math.min(1, dist[i] / maxDist);
    const softGlow = Math.exp(-dNorm * 4.2);
    const idx = i * 4;
    out[idx] = Math.round(dNorm * 255);
    out[idx + 1] = alpha[i];
    out[idx + 2] = Math.round(softGlow * 255);
    out[idx + 3] = 255;
  }

  return { size, data: out };
}

export async function buildSvgDistanceField(
  svgElement: SVGSVGElement,
  size = 128
): Promise<LogoSdfTextureData | null> {
  if (
    typeof window === "undefined" ||
    typeof XMLSerializer === "undefined" ||
    typeof document === "undefined"
  ) {
    return null;
  }

  try {
    const clone = svgElement.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (!clone.getAttribute("viewBox")) {
      const rect = svgElement.getBoundingClientRect();
      const w = rect.width || 100;
      const h = rect.height || 100;
      clone.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
    clone.setAttribute("width", String(size));
    clone.setAttribute("height", String(size));
    clone.style.color = "#ffffff";

    const xml = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = url;
    });

    URL.revokeObjectURL(url);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, size, size);
    // Draw logo at 48% of texture size centered so halo & distance field have generous margin
    const pad = size * 0.26;
    const drawSize = size - pad * 2;
    ctx.drawImage(img, pad, pad, drawSize, drawSize);

    const imgData = ctx.getImageData(0, 0, size, size).data;
    const alpha = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      alpha[i] = imgData[i * 4 + 3];
    }

    return buildSdfFromAlpha(alpha, size);
  } catch {
    return null;
  }
}
