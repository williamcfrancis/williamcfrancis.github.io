import type { PlayerState, WeaponState, GameState, KillFeedEntry } from './types';

const MAX_KILL_FEED = 5;
const KILL_FEED_DURATION = 4000;

let killFeedEntries: KillFeedEntry[] = [];

export function initHUD(): void {
  killFeedEntries = [];
}

export function updateHUD(
  player: PlayerState,
  weapon: WeaponState,
  game: GameState,
  fps: number,
  weaponStates: WeaponState[],
): void {
  // Health
  const healthEl = document.getElementById('health-value')!;
  const healthBarEl = document.getElementById('health-bar-fill')!;
  const healthPct = Math.max(0, player.health / player.maxHealth * 100);
  healthEl.textContent = Math.ceil(player.health).toString();
  healthBarEl.style.width = healthPct + '%';

  if (healthPct < 25) {
    healthEl.style.color = '#ff3333';
    healthBarEl.style.background = 'linear-gradient(90deg, #ff3333, #ff6666)';
  } else if (healthPct < 50) {
    healthEl.style.color = '#ffaa33';
    healthBarEl.style.background = 'linear-gradient(90deg, #ffaa33, #ffcc66)';
  } else {
    healthEl.style.color = '';
    healthBarEl.style.background = '';
  }

  // Armor
  const armorEl = document.getElementById('armor-value')!;
  if (player.armor > 0) {
    armorEl.textContent = `🛡 ${Math.ceil(player.armor)}`;
  } else {
    armorEl.textContent = '';
  }

  // Ammo
  const ammoEl = document.getElementById('ammo-value')!;
  const reserveEl = document.getElementById('ammo-reserve')!;
  const weaponNameEl = document.getElementById('weapon-name')!;

  if (weapon.reloading) {
    ammoEl.textContent = 'RELOADING';
    ammoEl.style.fontSize = '20px';
    ammoEl.style.color = '#ffaa33';
  } else {
    ammoEl.textContent = weapon.currentAmmo.toString();
    ammoEl.style.fontSize = '';
    ammoEl.style.color = weapon.currentAmmo <= weapon.def.magazineSize * 0.2 ? '#ff3333' : '';
  }

  reserveEl.textContent = `/ ${weapon.reserveAmmo}`;
  weaponNameEl.textContent = weapon.def.name;

  // Wave info
  document.getElementById('wave-number')!.textContent = game.wave.toString();

  // Score
  document.getElementById('score-value')!.textContent = player.score.toString();

  // FPS
  document.getElementById('fps-counter')!.textContent = `${fps} FPS`;

  // Weapon slots
  const slotsEl = document.getElementById('weapon-slots')!;
  if (slotsEl.children.length !== weaponStates.length) {
    slotsEl.innerHTML = '';
    weaponStates.forEach((ws, i) => {
      const slot = document.createElement('div');
      slot.className = 'weapon-slot';
      slot.dataset.slot = i.toString();
      slot.innerHTML = `<span style="font-size:10px;">${i + 1}</span>`;
      slotsEl.appendChild(slot);
    });
  }

  slotsEl.querySelectorAll('.weapon-slot').forEach((slot) => {
    const i = parseInt((slot as HTMLElement).dataset.slot || '0');
    slot.classList.toggle('active', weaponStates[i] === weapon);
  });

  // Kill feed cleanup
  const now = Date.now();
  killFeedEntries = killFeedEntries.filter(e => now - e.time < KILL_FEED_DURATION);
  renderKillFeed();
}

function renderKillFeed(): void {
  const container = document.getElementById('kill-feed')!;
  while (container.children.length > killFeedEntries.length) {
    container.removeChild(container.lastChild!);
  }
  while (container.children.length < killFeedEntries.length) {
    const entry = document.createElement('div');
    entry.className = 'kill-entry';
    container.appendChild(entry);
  }

  killFeedEntries.forEach((entry, i) => {
    const el = container.children[i] as HTMLElement;
    el.textContent = entry.text;
    if (entry.color) el.style.color = entry.color;
    const age = Date.now() - entry.time;
    el.style.opacity = Math.max(0, 1 - age / KILL_FEED_DURATION).toString();
  });
}

export function addKillFeedEntry(text: string, color?: string): void {
  killFeedEntries.unshift({ text, time: Date.now(), color });
  if (killFeedEntries.length > MAX_KILL_FEED) {
    killFeedEntries.pop();
  }
}

export function showDamageVignette(intensity: number): void {
  const el = document.getElementById('damage-vignette')!;
  el.style.background = `radial-gradient(ellipse at center, transparent 40%, rgba(255,0,0,${intensity * 0.5}) 100%)`;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 150);
}

export function showHitMarker(): void {
  const el = document.getElementById('hit-marker')!;
  el.classList.remove('active');
  void el.offsetWidth; // force reflow
  el.classList.add('active');
}

export function showWaveAnnounce(wave: number): void {
  const el = document.getElementById('wave-announce')!;
  el.textContent = `WAVE ${wave}`;
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

export function showGameOver(score: number, wave: number): void {
  document.getElementById('final-score')!.textContent = score.toString();
  document.getElementById('final-wave')!.textContent = wave.toString();
  document.getElementById('game-over-screen')!.style.display = 'flex';
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
