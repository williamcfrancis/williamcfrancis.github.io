import type { TranslationChain } from './types';
import { countryCodeToFlag } from './languages';

export async function shareResult(result: TranslationChain): Promise<void> {
  const drift = Math.round(result.totalDrift * 100);
  const shareData = {
    title: 'Lost in Translation',
    text: `"${result.original}" \u2192 "${result.finalText}" (${drift}% lost in translation)`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {
      /* cancelled */
    }
  }
  await copyToClipboard(`${shareData.text}\n\n${shareData.url}`);
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export function downloadShareImage(result: TranslationChain): void {
  const drift = Math.round(result.totalDrift * 100);
  const W = 800;
  const H = 520;
  const pad = 40;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(1, '#1a1a3e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';

  ctx.fillStyle = '#8888aa';
  ctx.font = '600 14px Inter, sans-serif';
  ctx.fillText('LOST IN TRANSLATION', W / 2, pad + 16);

  ctx.fillStyle = '#f0f0f5';
  ctx.font = '400 20px Inter, sans-serif';
  wrapText(ctx, `\u201C${result.original}\u201D`, W / 2, pad + 62, W - pad * 2, 26);

  const flagY = pad + 140;
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#4ecdc4';
  ctx.fillText('\u2193', W / 2, flagY);

  const flags = result.chain.map(l => countryCodeToFlag(l.countryCode)).join(' ');
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#555577';
  const trimmed = flags.length > 100 ? flags.slice(0, 100) + '\u2026' : flags;
  ctx.fillText(trimmed, W / 2, flagY + 28);

  ctx.fillStyle = '#ffd700';
  ctx.font = '700 22px Inter, sans-serif';
  wrapText(ctx, `\u201C${result.finalText}\u201D`, W / 2, flagY + 80, W - pad * 2, 28);

  const scoreY = H - 110;
  const color = drift > 66 ? '#ff6b6b' : drift > 33 ? '#f7dc6f' : '#4ecdc4';
  ctx.fillStyle = color;
  ctx.font = '700 52px Inter, sans-serif';
  ctx.fillText(`${drift}%`, W / 2, scoreY);

  ctx.fillStyle = '#8888aa';
  ctx.font = '400 16px Inter, sans-serif';
  ctx.fillText('lost in translation', W / 2, scoreY + 28);

  ctx.fillStyle = '#333355';
  ctx.font = '400 11px Inter, sans-serif';
  ctx.fillText('Lost in Translation \u2014 williamcfrancis.netlify.app', W / 2, H - 14);

  canvas.toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lost-in-translation.png';
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
): void {
  const words = text.split(' ');
  let line = '';
  let cy = y;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, cy);
}
