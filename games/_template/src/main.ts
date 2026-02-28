import { createInput } from '@shared/input';
import { createLoop } from '@shared/loop';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const input = createInput(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const state = {
  x: 0,
  y: 0,
};

const loop = createLoop({
  update(dt) {
    const snap = input.poll();
    const speed = 300;
    if (snap.keys.has('w') || snap.keys.has('arrowup')) state.y -= speed * dt;
    if (snap.keys.has('s') || snap.keys.has('arrowdown')) state.y += speed * dt;
    if (snap.keys.has('a') || snap.keys.has('arrowleft')) state.x -= speed * dt;
    if (snap.keys.has('d') || snap.keys.has('arrowright')) state.x += speed * dt;
  },

  render(_alpha) {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2 + state.x,
      canvas.height / 2 + state.y,
      20,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  },
});

loop.start();
