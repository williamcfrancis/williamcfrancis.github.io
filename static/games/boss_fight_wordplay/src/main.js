const BOSS_MAX_HP = 100;
const PLAYER_MAX_HP = 50;

const PHASE_THRESHOLDS = [
  { phase: 1, above: 75, name: "Lord Lexicon the Unbroken", color: "#e94560" },
  { phase: 2, above: 50, name: "Lord Lexicon the Furious", color: "#ff6b35" },
  { phase: 3, above: 25, name: "Lord Lexicon the Desperate", color: "#a855f7" },
  { phase: 4, above: -1, name: "Lexicon, The Unraveled", color: "#00ff88" },
];

const CATEGORY_ICONS = {
  wit: "🧠", roast: "🔥", flattery: "💐", philosophy: "🌀", chaos: "🎪", other: "⚔️",
};

const PHASE_INTROS = [
  null,
  "You dare approach me? I am Lord Lexicon, master of all words ever spoken. Your vocabulary is a puddle; mine is an ocean.",
  "ENOUGH! You've scratched my armor with your pathetic little syllables. Now I'm ANGRY. You'll regret every vowel.",
  "Wait... wait. How are you doing this? No one has ever... Please. Let's talk about this. Maybe we can make a deal?",
  "Y̸o̵u̷.̶.̸.̷ ̵b̵r̷o̵k̷e̸ ̸s̷o̵m̵e̸t̸h̴i̵n̵g̴.̸ I can see between the letters now. The words are eating themselves. ThE gAmE iS tHe GaMe Is ThE—",
];

const state = {
  bossHp: BOSS_MAX_HP,
  playerHp: PLAYER_MAX_HP,
  phase: 1,
  combo: 0,
  maxCombo: 0,
  busy: false,
  history: [],
  loreCollected: [],
  currentChallenge: null,
  turnsInPhase: 0,
  totalTurns: 0,
  phaseTransitioning: false,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
  titleScreen: $('#title-screen'),
  battleScreen: $('#battle-screen'),
  victoryScreen: $('#victory-screen'),
  defeatScreen: $('#defeat-screen'),
  bossHpFill: $('#boss-hp-fill'),
  bossHpText: $('#boss-hp-text'),
  playerHpFill: $('#player-hp-fill'),
  playerHpText: $('#player-hp-text'),
  dialogueBox: $('#dialogue-box'),
  dialogueText: $('#dialogue-text'),
  commandInput: $('#command-input'),
  submitBtn: $('#submit-btn'),
  bossSprite: $('#boss-sprite'),
  bossBody: $('.boss-body'),
  bossName: $('#boss-name'),
  phaseIndicator: $('#phase-indicator'),
  comboCounter: $('#combo-counter'),
  comboCount: $('#combo-count'),
  categoryTag: $('#category-tag'),
  challengeBox: $('#challenge-box'),
  challengeText: $('#challenge-text'),
  loreBtn: $('#lore-btn'),
  lorePanel: $('#lore-panel'),
  loreList: $('#lore-list'),
  loreCount: $('#lore-count'),
  turnCounter: $('#turn-counter'),
  bossAttackName: $('#boss-attack-name'),
  weaknessHint: $('#weakness-hint'),
  weaknessText: $('#weakness-text'),
  phaseTransition: $('#phase-transition'),
  phaseTransitionName: $('#phase-transition-name'),
  battleLog: $('#battle-log'),
  apiStatus: $('#api-status'),
  statusLabel: $('#status-label'),
  victoryStats: $('#victory-stats'),
  particles: $('#particles'),
};

function setStatus(mode) {
  els.apiStatus.className = mode;
  const labels = { gemini: 'gemini', fallback: 'offline', thinking: 'thinking...' };
  els.statusLabel.textContent = labels[mode] || 'offline';
}

function getPhase(hp) {
  const pct = (hp / BOSS_MAX_HP) * 100;
  for (const t of PHASE_THRESHOLDS) {
    if (pct > t.above) return t;
  }
  return PHASE_THRESHOLDS[PHASE_THRESHOLDS.length - 1];
}

function updateHud() {
  const bossPct = Math.max(0, (state.bossHp / BOSS_MAX_HP) * 100);
  const playerPct = Math.max(0, (state.playerHp / PLAYER_MAX_HP) * 100);

  els.bossHpFill.style.width = bossPct + '%';
  els.bossHpText.textContent = `${Math.max(0, state.bossHp)} / ${BOSS_MAX_HP}`;
  els.playerHpFill.style.width = playerPct + '%';
  els.playerHpText.textContent = `${Math.max(0, state.playerHp)} / ${PLAYER_MAX_HP}`;
  els.turnCounter.textContent = `Turn ${state.totalTurns}`;

  if (state.combo >= 2) {
    els.comboCounter.classList.remove('hidden');
    els.comboCount.textContent = `${state.combo}x COMBO`;
    els.comboCounter.classList.toggle('combo-hot', state.combo >= 4);
  } else {
    els.comboCounter.classList.add('hidden');
  }
}

function showScreen(screen) {
  [els.titleScreen, els.battleScreen, els.victoryScreen, els.defeatScreen].forEach((s) =>
    s.classList.add('hidden')
  );
  screen.classList.remove('hidden');
}

function typeText(element, text, speed = 20) {
  return new Promise((resolve) => {
    element.textContent = '';
    let i = 0;
    function tick() {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    }
    tick();
  });
}

function showDialogue(text) {
  els.dialogueBox.classList.remove('hidden');
  typeText(els.dialogueText, text);
}

function showDamagePopup(amount, x, y, isHeal) {
  const popup = document.createElement('div');
  popup.className = 'floating-damage' + (isHeal ? ' heal-popup' : '');
  popup.textContent = isHeal ? `+${amount}` : `-${amount} HP`;
  popup.style.left = (x || 50) + '%';
  popup.style.top = (y || 40) + '%';
  document.getElementById('game-container').appendChild(popup);
  setTimeout(() => popup.remove(), 1200);
}

function triggerBossHit(damage) {
  els.bossBody.classList.remove('boss-hit');
  void els.bossBody.offsetWidth;
  els.bossBody.classList.add('boss-hit');

  if (damage >= 15) {
    spawnParticles(6, 'crit');
  } else if (damage >= 8) {
    spawnParticles(3, 'hit');
  }
}

function triggerScreenShake(intensity = 1) {
  const container = $('#game-container');
  container.style.setProperty('--shake-intensity', intensity);
  container.classList.remove('screen-shake');
  void container.offsetWidth;
  container.classList.add('screen-shake');
}

function spawnParticles(count, type) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = `particle particle-${type}`;
    p.style.left = (40 + Math.random() * 20) + '%';
    p.style.top = (30 + Math.random() * 20) + '%';
    p.style.setProperty('--dx', (Math.random() - 0.5) * 120 + 'px');
    p.style.setProperty('--dy', (Math.random() - 0.5) * 120 + 'px');
    els.particles.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function applyPhaseVisuals(phaseData) {
  const root = document.documentElement;
  root.setAttribute('data-phase', phaseData.phase);
  root.style.setProperty('--phase-color', phaseData.color);
  els.bossName.textContent = phaseData.name;
  els.phaseIndicator.textContent = `Phase ${phaseData.phase}/4`;
  els.bossHpFill.style.background = phaseData.color;
}

async function showPhaseTransition(phaseData) {
  state.phaseTransitioning = true;
  els.phaseTransitionName.textContent = phaseData.name;
  els.phaseTransition.classList.remove('hidden');
  els.phaseTransition.classList.add('phase-flash');

  await new Promise((r) => setTimeout(r, 2000));

  els.phaseTransition.classList.add('hidden');
  els.phaseTransition.classList.remove('phase-flash');

  applyPhaseVisuals(phaseData);

  const intro = PHASE_INTROS[phaseData.phase];
  if (intro) showDialogue(intro);

  await new Promise((r) => setTimeout(r, intro ? intro.length * 20 + 500 : 500));
  state.phaseTransitioning = false;
}

function addToBattleLog(who, text, extra) {
  const entry = document.createElement('div');
  entry.className = `log-entry log-${who}`;
  let html = `<span class="log-who">${who === 'player' ? 'YOU' : 'BOSS'}</span> ${escapeHtml(text)}`;
  if (extra) html += `<span class="log-extra">${escapeHtml(extra)}</span>`;
  entry.innerHTML = html;
  els.battleLog.appendChild(entry);
  els.battleLog.scrollTop = els.battleLog.scrollHeight;

  while (els.battleLog.children.length > 30) {
    els.battleLog.removeChild(els.battleLog.firstChild);
  }
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function addLore(fragment) {
  if (!fragment || state.loreCollected.includes(fragment)) return;
  state.loreCollected.push(fragment);
  els.loreCount.textContent = state.loreCollected.length;
  els.loreBtn.classList.add('lore-glow');
  setTimeout(() => els.loreBtn.classList.remove('lore-glow'), 2000);

  const li = document.createElement('li');
  li.textContent = fragment;
  li.className = 'lore-entry lore-new';
  els.loreList.appendChild(li);
  setTimeout(() => li.classList.remove('lore-new'), 1500);
}

function showChallenge(challenge) {
  if (!challenge) {
    els.challengeBox.classList.add('hidden');
    state.currentChallenge = null;
    return;
  }
  state.currentChallenge = challenge;
  els.challengeBox.classList.remove('hidden');
  typeText(els.challengeText, `⚡ BOSS CHALLENGE: ${challenge}`);
}

function showWeaknessHint(hint) {
  if (!hint) {
    els.weaknessHint.classList.add('hidden');
    return;
  }
  els.weaknessHint.classList.remove('hidden');
  els.weaknessText.textContent = hint;
  setTimeout(() => els.weaknessHint.classList.add('hidden'), 6000);
}

function showCategory(category) {
  if (!category || category === 'none') {
    els.categoryTag.classList.add('hidden');
    return;
  }
  const icon = CATEGORY_ICONS[category] || '⚔️';
  els.categoryTag.classList.remove('hidden');
  els.categoryTag.textContent = `${icon} ${category.toUpperCase()}`;
  els.categoryTag.className = `category-tag cat-${category}`;
}

async function sendAttack(userInput) {
  setStatus('thinking');
  const payload = {
    input: userInput,
    phase: state.phase,
    history: state.history,
    combo: state.combo,
    bossHpPercent: Math.round((state.bossHp / BOSS_MAX_HP) * 100),
  };

  let res;
  try {
    console.log('[Boss Fight] Sending attack...', { phase: state.phase, combo: state.combo, inputLen: userInput.length });
    res = await fetch('/.netlify/functions/attack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (fetchErr) {
    console.error('[Boss Fight] fetch() failed — cannot reach Netlify function:', fetchErr.name, fetchErr.message);
    console.error('[Boss Fight] This usually means:');
    console.error('  1. The site is not deployed on Netlify (e.g. on GitHub Pages, where /.netlify/functions/ does not exist)');
    console.error('  2. The Netlify function is not deployed or has a build error');
    console.error('  3. Network/CORS issue');
    setStatus('fallback');
    return fallbackAttack(userInput);
  }

  try {
    const text = await res.text();
    console.log('[Boss Fight] Response status:', res.status, res.statusText);

    if (!res.ok) {
      console.error(`[Boss Fight] Netlify function returned HTTP ${res.status}:`, text.slice(0, 500));
      setStatus('fallback');
      return fallbackAttack(userInput);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error('[Boss Fight] Failed to parse response JSON:', jsonErr.message, 'Raw response:', text.slice(0, 500));
      setStatus('fallback');
      return fallbackAttack(userInput);
    }

    if (data._debug) {
      console.warn('[Boss Fight] Server returned debug info:', data._debug);
    }

    if (data._debug?.error && !data.response?.includes('mildly annoyed') && !data.response?.includes('scrambled')) {
      console.error('[Boss Fight] Server-side error occurred. Using fallback. Debug:', JSON.stringify(data._debug, null, 2));
    }

    setStatus('gemini');
    return data;
  } catch (err) {
    console.error('[Boss Fight] Unexpected error processing response:', err.message, err.stack);
    setStatus('fallback');
    return fallbackAttack(userInput);
  }
}

function fallbackAttack(userInput) {
  const len = userInput.trim().length;
  let damage, response;

  if (len === 0) {
    damage = 0;
    response = "Silence? That's the best you've got? I've been hurt more by a gentle breeze.";
  } else if (len < 5) {
    damage = Math.floor(Math.random() * 5);
    response = "Was that a word or did you sneeze on your keyboard?";
  } else if (len < 20) {
    damage = 5 + Math.floor(Math.random() * 10);
    response = "Hmm, that actually stung a little. But I've absorbed entire dictionaries — you'll need more than that!";
  } else {
    damage = 12 + Math.floor(Math.random() * 13);
    response = "ARGH! Your words burn like fire! But I won't fall to the likes of you!";
  }

  const phase = getPhase(state.bossHp);
  return {
    damage,
    bossDamage: phase.phase + Math.floor(Math.random() * 3),
    response,
    category: "other",
    combo: damage >= 10,
    lore: null,
    challenge: null,
    weakness: null,
    bossAttackName: "Dark Word",
  };
}

async function bossCounterAttack(data) {
  const bossDmg = Math.min(8, Math.max(1, data.bossDamage || (state.phase + Math.floor(Math.random() * 3))));
  state.playerHp = Math.max(0, state.playerHp - bossDmg);
  updateHud();
  triggerScreenShake(state.phase * 0.5);

  const attackName = data.bossAttackName || 'Dark Word';
  els.bossAttackName.textContent = attackName;
  els.bossAttackName.classList.remove('hidden');
  setTimeout(() => els.bossAttackName.classList.add('hidden'), 2000);

  showDamagePopup(bossDmg, 50, 70, false);
  showDialogue(`${attackName}! The boss strikes for ${bossDmg} damage!`);
  addToBattleLog('boss', `${attackName} — ${bossDmg} damage`);
}

async function handleSubmit() {
  if (state.busy || state.phaseTransitioning) return;
  const input = els.commandInput.value.trim();
  if (!input) return;

  state.busy = true;
  els.submitBtn.disabled = true;
  els.commandInput.disabled = true;
  els.commandInput.value = '';
  state.totalTurns++;

  addToBattleLog('player', input);

  const data = await sendAttack(input);

  const maxDmg = state.phase === 4 ? 25 : state.phase === 3 ? 24 : state.phase === 2 ? 22 : 20;
  let clampedDamage = Math.min(Math.max(0, Math.round(data.damage)), maxDmg);

  if (data.combo && state.combo >= 2) {
    const bonus = Math.min(5, Math.floor(state.combo * 1.5));
    clampedDamage = Math.min(maxDmg, clampedDamage + bonus);
  }

  state.bossHp = Math.max(0, state.bossHp - clampedDamage);

  if (data.combo) {
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
  } else {
    state.combo = 0;
  }

  updateHud();

  if (clampedDamage > 0) {
    triggerBossHit(clampedDamage);
    showDamagePopup(clampedDamage, 50, 35, false);
  }

  showCategory(data.category);
  showDialogue(data.response);
  addToBattleLog('boss', data.response, data.category ? `[${data.category}]` : '');

  state.history.push({ player: input, boss: data.response });
  if (state.history.length > 15) state.history.shift();

  if (data.lore) addLore(data.lore);
  if (data.weakness) showWeaknessHint(data.weakness);

  const newPhaseData = getPhase(state.bossHp);
  if (newPhaseData.phase !== state.phase && state.bossHp > 0) {
    state.phase = newPhaseData.phase;
    state.turnsInPhase = 0;
    await new Promise((r) => setTimeout(r, 1200));
    await showPhaseTransition(newPhaseData);
  }

  if (state.bossHp <= 0) {
    await new Promise((r) => setTimeout(r, 1500));
    showVictory();
    state.busy = false;
    return;
  }

  await new Promise((r) => setTimeout(r, 1800));
  await bossCounterAttack(data);

  if (state.playerHp <= 0) {
    await new Promise((r) => setTimeout(r, 1500));
    showScreen(els.defeatScreen);
    state.busy = false;
    return;
  }

  if (data.challenge) {
    await new Promise((r) => setTimeout(r, 800));
    showChallenge(data.challenge);
  }

  state.turnsInPhase++;
  state.busy = false;
  els.submitBtn.disabled = false;
  els.commandInput.disabled = false;
  els.commandInput.focus();
}

function showVictory() {
  showScreen(els.victoryScreen);
  els.victoryStats.innerHTML = `
    <div class="stat-line">Turns taken: <span class="stat-val">${state.totalTurns}</span></div>
    <div class="stat-line">Max combo: <span class="stat-val">${state.maxCombo}x</span></div>
    <div class="stat-line">Lore discovered: <span class="stat-val">${state.loreCollected.length} / 12</span></div>
    <div class="stat-line">HP remaining: <span class="stat-val">${Math.max(0, state.playerHp)} / ${PLAYER_MAX_HP}</span></div>
  `;
}

function initBattle() {
  state.bossHp = BOSS_MAX_HP;
  state.playerHp = PLAYER_MAX_HP;
  state.phase = 1;
  state.combo = 0;
  state.maxCombo = 0;
  state.busy = false;
  state.history = [];
  state.loreCollected = [];
  state.currentChallenge = null;
  state.turnsInPhase = 0;
  state.totalTurns = 0;
  state.phaseTransitioning = false;

  els.dialogueBox.classList.add('hidden');
  els.comboCounter.classList.add('hidden');
  els.categoryTag.classList.add('hidden');
  els.challengeBox.classList.add('hidden');
  els.weaknessHint.classList.add('hidden');
  els.bossAttackName.classList.add('hidden');
  els.loreList.innerHTML = '';
  els.loreCount.textContent = '0';
  els.battleLog.innerHTML = '';
  els.commandInput.value = '';
  els.commandInput.disabled = false;
  els.submitBtn.disabled = false;

  const firstPhase = PHASE_THRESHOLDS[0];
  applyPhaseVisuals(firstPhase);
  updateHud();
  showScreen(els.battleScreen);

  setTimeout(() => {
    showDialogue(PHASE_INTROS[1]);
  }, 400);

  setTimeout(() => els.commandInput.focus(), 600);
}

function toggleLorePanel() {
  els.lorePanel.classList.toggle('hidden');
}

$('#start-btn').addEventListener('click', initBattle);
$('#replay-btn').addEventListener('click', initBattle);
$('#retry-btn').addEventListener('click', initBattle);
els.submitBtn.addEventListener('click', handleSubmit);
els.commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSubmit();
});
els.loreBtn.addEventListener('click', toggleLorePanel);

$('#lore-close').addEventListener('click', () => {
  els.lorePanel.classList.add('hidden');
});
