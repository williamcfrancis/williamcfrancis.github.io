import type { UserAnswer } from './types';

export function generateShareImage(
  score: number,
  total: number,
  answers: UserAnswer[],
): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 340;
  const ctx = canvas.getContext('2d')!;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 600, 340);
  bg.addColorStop(0, '#0a0c10');
  bg.addColorStop(1, '#131620');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 600, 340);

  // Border
  ctx.strokeStyle = 'rgba(100, 120, 180, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 598, 338);

  // Title
  ctx.fillStyle = '#eef0f6';
  ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('The Turing Shuffle', 300, 50);

  // Score
  ctx.font = 'bold 52px "Inter", sans-serif';
  const scoreGrad = ctx.createLinearGradient(200, 80, 400, 140);
  if (score >= 7) {
    scoreGrad.addColorStop(0, '#2dd4bf');
    scoreGrad.addColorStop(1, '#38bdf8');
  } else if (score >= 4) {
    scoreGrad.addColorStop(0, '#fbbf24');
    scoreGrad.addColorStop(1, '#f97316');
  } else {
    scoreGrad.addColorStop(0, '#f87171');
    scoreGrad.addColorStop(1, '#fb923c');
  }
  ctx.fillStyle = scoreGrad;
  ctx.fillText(`${score} / ${total}`, 300, 130);

  // Subtitle
  ctx.fillStyle = '#8892b0';
  ctx.font = '16px "Inter", sans-serif';
  ctx.fillText('Can you tell human writing from AI?', 300, 165);

  // Answer squares
  const squareSize = 36;
  const gap = 8;
  const totalWidth = total * squareSize + (total - 1) * gap;
  const startX = (600 - totalWidth) / 2;
  const squareY = 195;

  for (let i = 0; i < answers.length; i++) {
    const x = startX + i * (squareSize + gap);
    const correct = answers[i].correct;

    ctx.fillStyle = correct
      ? 'rgba(45, 212, 191, 0.2)'
      : 'rgba(248, 113, 113, 0.2)';
    ctx.beginPath();
    ctx.roundRect(x, squareY, squareSize, squareSize, 6);
    ctx.fill();

    ctx.strokeStyle = correct
      ? 'rgba(45, 212, 191, 0.6)'
      : 'rgba(248, 113, 113, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, squareY, squareSize, squareSize, 6);
    ctx.stroke();

    if (correct) {
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 10, squareY + 18);
      ctx.lineTo(x + 16, squareY + 25);
      ctx.lineTo(x + 27, squareY + 12);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 10, squareY + 10);
      ctx.lineTo(x + 26, squareY + 26);
      ctx.moveTo(x + 26, squareY + 10);
      ctx.lineTo(x + 10, squareY + 26);
      ctx.stroke();
    }
  }

  // CTA
  ctx.fillStyle = '#eef0f6';
  ctx.font = '500 18px "Inter", sans-serif';
  ctx.fillText('Can you beat me?', 300, 275);

  // Watermark
  ctx.fillStyle = '#4a5568';
  ctx.font = '13px "Inter", sans-serif';
  ctx.fillText('williamcfrancis.netlify.app', 300, 315);

  return canvas.toDataURL('image/png');
}

export async function shareScore(
  score: number,
  total: number,
  answers: UserAnswer[],
): Promise<void> {
  const imageUrl = generateShareImage(score, total, answers);
  const text = `I scored ${score}/${total} on The Turing Shuffle — can you tell human writing from AI? 🤖✍️\n\nhttps://williamcfrancis.netlify.app/games/turing_shuffle/`;

  if (navigator.share) {
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], 'turing-shuffle-score.png', {
        type: 'image/png',
      });
      await navigator.share({ text, files: [file] });
      return;
    } catch {
      // Fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    showCopiedToast();
  } catch {
    // Last resort: open in new tab
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(
        `<html><body style="background:#0a0c10;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif;color:#eef0f6"><img src="${imageUrl}" style="max-width:100%"/><p style="margin-top:20px">${text}</p></body></html>`,
      );
    }
  }
}

function showCopiedToast(): void {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = 'Score copied to clipboard!';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
