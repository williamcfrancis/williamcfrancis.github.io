import { getRarityDef } from './weapons.js';
import { hasSeenTutorial, markTutorialSeen } from './persistence.js';

// ── Main HUD Update ──

export function updateHUD(state, els, maxHp) {
  const pct = Math.max(0, state.playerHp / maxHp * 100);
  els.hpFill.style.width = pct + '%';
  if (pct > 50) els.hpFill.style.background = 'linear-gradient(90deg,#81C784,#4CAF50)';
  else if (pct > 25) els.hpFill.style.background = 'linear-gradient(90deg,#FFD54F,#FFA726)';
  else els.hpFill.style.background = 'linear-gradient(90deg,#EF9A9A,#E53935)';
  els.hpText.textContent = `${Math.max(0, state.playerHp)} / ${maxHp}`;
  els.scoreText.textContent = state.score.toLocaleString();
  els.waveText.textContent = `Wave ${state.wave}`;
  els.pollenText.textContent = `Pollen: ${state.pollen}`;

  // Weapon slots
  updateWeaponSlots(state, els);

  // Buffs
  updateBuffIcons(state, els);

  // Dash cooldown
  updateDashIndicator(state, els);
}

function updateWeaponSlots(state, els) {
  if (!els.weaponSlots) return;
  const slots = els.weaponSlots.children;
  for (let i = 0; i < 3; i++) {
    const slot = slots[i];
    if (!slot) continue;
    if (i < state.weapons.length) {
      const w = state.weapons[i];
      const rarityDef = getRarityDef(w.rarity);
      slot.querySelector('.slot-name').textContent = w.name;
      slot.querySelector('.slot-dot').style.background = rarityDef.color;
      slot.classList.toggle('active', i === state.activeWeaponIdx);
      slot.classList.remove('empty');
    } else {
      slot.querySelector('.slot-name').textContent = 'Empty';
      slot.querySelector('.slot-dot').style.background = '#666';
      slot.classList.remove('active');
      slot.classList.add('empty');
    }
  }
}

function updateBuffIcons(state, els) {
  if (!els.buffsContainer) return;
  const now = performance.now();
  let html = '';
  for (const b of state.activeBuffs) {
    const remaining = Math.ceil((b.until - now) / 1000);
    if (b.type === 'speed') html += `<span class="buff-icon buff-speed">${remaining}s</span>`;
    if (b.type === 'damage') html += `<span class="buff-icon buff-damage">${remaining}s</span>`;
  }
  els.buffsContainer.innerHTML = html;
}

function updateDashIndicator(state, els) {
  if (!els.dashCd) return;
  const now = performance.now();
  const remaining = Math.max(0, state.dashCooldownUntil - now);
  const pct = 1 - remaining / 1500;
  els.dashCd.style.background = `conic-gradient(#81C784 ${pct * 360}deg, rgba(0,0,0,0.2) ${pct * 360}deg)`;
  els.dashCd.textContent = remaining > 0 ? '' : '⇧';
}

// ── Boss HP Bar ──

export function updateBossHpBar(state, els) {
  if (!els.bossHpBar) return;
  if (state.boss && state.boss.hp > 0) {
    els.bossHpBar.style.display = 'block';
    const pct = Math.max(0, state.boss.hp / state.boss.maxHp * 100);
    els.bossHpFill.style.width = pct + '%';
    els.bossHpName.textContent = 'Titan Gourd';
  } else {
    els.bossHpBar.style.display = 'none';
  }
}

// ── Minimap ──

export function updateMinimap(canvas, state, islandRadius) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const half = size / 2;
  const scale = (half - 4) / islandRadius;

  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.arc(half, half, half - 1, 0, Math.PI * 2);
  ctx.fill();

  // Island boundary
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(half, half, islandRadius * scale, 0, Math.PI * 2);
  ctx.stroke();

  // Pickups
  ctx.fillStyle = '#FFD54F';
  for (const p of state.pickups) {
    ctx.beginPath();
    ctx.arc(half + p.mesh.position.x * scale, half + p.mesh.position.z * scale, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Enemies
  for (const e of state.enemies) {
    ctx.fillStyle = e.isBoss ? '#FF5722' : '#EF5350';
    const r = e.isBoss ? 4 : 2;
    ctx.beginPath();
    ctx.arc(half + e.mesh.position.x * scale, half + e.mesh.position.z * scale, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Player
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.arc(half + state.playerPos.x * scale, half + state.playerPos.z * scale, 3, 0, Math.PI * 2);
  ctx.fill();
}

// ── Tutorial System ──

let tutorialActive = false;
let tutorialEl = null;
let tutorialTimeout = null;

export function initTutorial(state) {
  if (hasSeenTutorial()) return;
  tutorialActive = true;
  tutorialEl = document.getElementById('tutorial-hint');
  state.tutorialStep = 0;
  showHint('Use WASD to move!');
}

export function updateTutorial(state) {
  if (!tutorialActive) return;

  switch (state.tutorialStep) {
    case 0:
      if (state.playerPos.x !== 0 || state.playerPos.z !== 0) {
        state.tutorialStep = 1;
        showHint('Click to shoot!');
      }
      break;
    case 1:
      if (state.kills > 0 || state.projectiles.length > 0) {
        state.tutorialStep = 2;
        showHint('Press Space to forge a weapon!');
      }
      break;
    case 2:
      if (state.wave > 1 || state.weapons[0].name !== 'Starter Orb') {
        hideHint();
        tutorialActive = false;
        markTutorialSeen();
      }
      break;
  }
}

function showHint(text) {
  if (!tutorialEl) return;
  if (tutorialTimeout) clearTimeout(tutorialTimeout);
  tutorialEl.textContent = text;
  tutorialEl.style.opacity = '1';
  tutorialTimeout = setTimeout(() => {
    if (tutorialEl) tutorialEl.style.opacity = '0';
  }, 5000);
}

function hideHint() {
  if (tutorialEl) tutorialEl.style.opacity = '0';
}

// ── Weapon Gallery Rendering ──

export function renderGallery(container, gallery) {
  if (!container) return;
  container.innerHTML = '';
  if (gallery.length === 0) {
    container.innerHTML = '<p style="color:#9E9E9E;text-align:center">No weapons forged yet!</p>';
    return;
  }
  for (const w of gallery) {
    const rarityDef = getRarityDef(w.rarity);
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      ${w.spriteDataUrl ? `<img src="${w.spriteDataUrl}" class="gallery-img" alt="${w.name}"/>` : '<div class="gallery-img-placeholder">?</div>'}
      <div class="gallery-name" style="color:${rarityDef.color}">${w.name}</div>
      <div class="gallery-stats">SPD:${w.speed.toFixed(1)} DMG:${w.damage} BNC:${w.bounces}</div>
      <div class="gallery-rarity" style="color:${rarityDef.color}">${rarityDef.label}</div>
    `;
    container.appendChild(card);
  }
}

// ── High Scores Rendering ──

export function renderHighScores(container, scores) {
  if (!container) return;
  container.innerHTML = '';
  if (scores.length === 0) {
    container.innerHTML = '<p style="color:#9E9E9E;text-align:center">No scores yet. Play a round!</p>';
    return;
  }
  for (let i = 0; i < scores.length; i++) {
    const s = scores[i];
    const row = document.createElement('div');
    row.className = 'score-row';
    row.innerHTML = `
      <span class="score-rank">#${i + 1}</span>
      <span class="score-val">${s.score.toLocaleString()}</span>
      <span class="score-meta">Wave ${s.wave} · ${s.kills} kills</span>
    `;
    container.appendChild(row);
  }
}
