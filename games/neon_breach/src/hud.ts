import type { PlayerState, WeaponState, GameState, KillFeedEntry } from './types';

let killFeedEntries: KillFeedEntry[] = [];

export function initHUD(): void {
  killFeedEntries = [];
}

export function updateHUD(
  player: PlayerState,
  weapon: WeaponState,
  gameState: GameState,
  fps: number,
  weapons: WeaponState[],
): void {
  const healthEl = document.getElementById('health-value')!;
  const healthBar = document.getElementById('health-bar-fill')!;
  const armorEl = document.getElementById('armor-value')!;
  const ammoEl = document.getElementById('ammo-value')!;
  const ammoReserve = document.getElementById('ammo-reserve')!;
  const weaponNameEl = document.getElementById('weapon-name')!;
  const waveEl = document.getElementById('wave-number')!;
  const scoreEl = document.getElementById('score-value')!;
  const fpsEl = document.getElementById('fps-counter')!;
  const slotsEl = document.getElementById('weapon-slots')!;
  const comboEl = document.getElementById('combo-display')!;
  const styleEl = document.getElementById('style-points')!;
  const energyEl = document.getElementById('bt-energy-fill')!;

  healthEl.textContent = Math.ceil(player.health).toString();
  healthBar.style.width = `${Math.max(0, (player.health / player.maxHealth) * 100)}%`;

  if (player.health < 30) {
    healthBar.style.background = 'linear-gradient(90deg, #ff3333, #ff0000)';
    healthEl.style.color = '#ff3333';
  } else {
    healthBar.style.background = 'linear-gradient(90deg, #00ffc8, #00ff88)';
    healthEl.style.color = '#fff';
  }

  armorEl.textContent = player.armor > 0 ? `🛡 ${Math.ceil(player.armor)}` : '';
  ammoEl.textContent = weapon.reloading ? '...' : weapon.currentAmmo.toString();
  ammoReserve.textContent = `/ ${weapon.reserveAmmo}`;
  weaponNameEl.textContent = weapon.def.name;
  waveEl.textContent = gameState.wave.toString();
  scoreEl.textContent = player.score.toString();
  fpsEl.textContent = `${fps} FPS`;

  // Combo display
  if (player.comboMultiplier > 1) {
    comboEl.style.opacity = '1';
    comboEl.textContent = `${player.comboMultiplier.toFixed(1)}x COMBO`;
    comboEl.style.color = player.comboMultiplier >= 4 ? '#ff3333' : player.comboMultiplier >= 2.5 ? '#ffaa00' : '#00ffc8';
  } else {
    comboEl.style.opacity = '0';
  }

  // Style points
  if (player.stylePoints > 0) {
    styleEl.style.opacity = '1';
    styleEl.textContent = `STYLE: ${player.stylePoints}`;
  } else {
    styleEl.style.opacity = '0';
  }

  // Bullet time energy bar
  if (energyEl) {
    energyEl.style.width = `${Math.max(0, player.bulletTimeEnergy * 100)}%`;
    if (player.bulletTimeActive) {
      energyEl.style.background = 'linear-gradient(90deg, #ff00ff, #8800ff)';
    } else {
      energyEl.style.background = 'linear-gradient(90deg, #00aaff, #0044ff)';
    }
  }

  // Weapon slots
  if (slotsEl) {
    slotsEl.innerHTML = '';
    weapons.forEach((w, i) => {
      const slot = document.createElement('div');
      slot.className = `weapon-slot${i === weapons.indexOf(weapon) ? ' active' : ''}`;
      slot.innerHTML = `<span class="slot-num">${i + 1}</span><span class="slot-icon">${w.def.icon}</span>`;
      slotsEl.appendChild(slot);
    });
  }

  // Kill feed cleanup
  const now = performance.now();
  killFeedEntries = killFeedEntries.filter(e => now - e.time < 4000);
  const feedEl = document.getElementById('kill-feed')!;
  feedEl.innerHTML = '';
  killFeedEntries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'kill-entry';
    div.textContent = entry.text;
    if (entry.color) div.style.color = entry.color;
    feedEl.appendChild(div);
  });
}

export function addKillFeedEntry(text: string, color?: string): void {
  killFeedEntries.push({ text, time: performance.now(), color });
  if (killFeedEntries.length > 6) killFeedEntries.shift();
}

export function showDamageVignette(intensity: number): void {
  const el = document.getElementById('damage-vignette')!;
  el.style.opacity = Math.min(1, intensity).toString();
  el.style.background = `radial-gradient(ellipse at center, transparent 40%, rgba(255,0,0,${intensity * 0.4}) 100%)`;
}

export function showHitMarker(): void {
  const el = document.getElementById('hit-marker')!;
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

export function showWaveAnnounce(wave: number): void {
  const el = document.getElementById('wave-announce')!;
  el.textContent = `WAVE ${wave}`;
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

export function showBossAnnounce(): void {
  const el = document.getElementById('wave-announce')!;
  el.textContent = '⚠ BOSS INCOMING ⚠';
  el.style.color = '#ff3333';
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
  setTimeout(() => { el.style.color = ''; }, 3000);
}

export function showStylePopup(text: string, color: string): void {
  const el = document.getElementById('style-popup')!;
  el.textContent = text;
  el.style.color = color;
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

export function showGameOver(score: number, wave: number): void {
  const screen = document.getElementById('game-over-screen')!;
  screen.style.display = 'flex';
  document.getElementById('final-score')!.textContent = score.toString();
  document.getElementById('final-wave')!.textContent = wave.toString();
}

export function hideGameOver(): void {
  document.getElementById('game-over-screen')!.style.display = 'none';
}

export function showHUD(): void {
  document.getElementById('hud')!.style.display = 'block';
}

export function hideHUD(): void {
  document.getElementById('hud')!.style.display = 'none';
}

export function showMenu(): void {
  document.getElementById('menu-screen')!.style.display = 'flex';
}

export function hideMenu(): void {
  document.getElementById('menu-screen')!.style.display = 'none';
}
