const BOSS_MAX_HP = 100;
const PLAYER_MAX_HP = 30;

const state = {
  bossHp: BOSS_MAX_HP,
  playerHp: PLAYER_MAX_HP,
  busy: false,
};

const $ = (sel) => document.querySelector(sel);

const titleScreen = $('#title-screen');
const battleScreen = $('#battle-screen');
const victoryScreen = $('#victory-screen');
const defeatScreen = $('#defeat-screen');
const bossHpFill = $('#boss-hp-fill');
const bossHpText = $('#boss-hp-text');
const playerHpFill = $('#player-hp-fill');
const playerHpText = $('#player-hp-text');
const dialogueBox = $('#dialogue-box');
const dialogueText = $('#dialogue-text');
const damagePopup = $('#damage-popup');
const commandInput = $('#command-input');
const submitBtn = $('#submit-btn');
const bossBody = $('.boss-body');

function updateHud() {
  const bossPct = Math.max(0, (state.bossHp / BOSS_MAX_HP) * 100);
  const playerPct = Math.max(0, (state.playerHp / PLAYER_MAX_HP) * 100);

  bossHpFill.style.width = bossPct + '%';
  bossHpText.textContent = `${Math.max(0, state.bossHp)} / ${BOSS_MAX_HP}`;

  playerHpFill.style.width = playerPct + '%';
  playerHpText.textContent = `${Math.max(0, state.playerHp)} / ${PLAYER_MAX_HP}`;
}

function showScreen(screen) {
  [titleScreen, battleScreen, victoryScreen, defeatScreen].forEach((s) =>
    s.classList.add('hidden')
  );
  screen.classList.remove('hidden');
}

function showDialogue(text) {
  dialogueBox.classList.remove('hidden');
  dialogueText.textContent = '';
  let i = 0;
  const speed = 25;
  function typeChar() {
    if (i < text.length) {
      dialogueText.textContent += text[i];
      i++;
      setTimeout(typeChar, speed);
    }
  }
  typeChar();
}

function showDamagePopup(amount) {
  damagePopup.textContent = `-${amount} HP`;
  damagePopup.classList.remove('hidden');
  damagePopup.style.animation = 'none';
  void damagePopup.offsetWidth;
  damagePopup.style.animation = '';
  setTimeout(() => damagePopup.classList.add('hidden'), 1000);
}

function triggerBossHit() {
  bossBody.classList.remove('boss-hit');
  void bossBody.offsetWidth;
  bossBody.classList.add('boss-hit');
}

function triggerScreenShake() {
  const container = $('#game-container');
  container.classList.remove('screen-shake');
  void container.offsetWidth;
  container.classList.add('screen-shake');
}

async function sendAttack(userInput) {
  try {
    const res = await fetch('/.netlify/functions/attack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userInput }),
    });

    if (!res.ok) throw new Error('Server error');

    const data = await res.json();
    return data;
  } catch {
    return fallbackAttack(userInput);
  }
}

function fallbackAttack(userInput) {
  const len = userInput.trim().length;
  let damage = 0;
  let response = '';

  if (len === 0) {
    damage = 0;
    response = "You stand there saying nothing. Pathetic.";
  } else if (len < 5) {
    damage = Math.floor(Math.random() * 5);
    const replies = [
      "Was that supposed to hurt? Laughable.",
      "My minions hit harder than that.",
      "I've seen scarier butterflies.",
    ];
    response = replies[Math.floor(Math.random() * replies.length)];
  } else if (len < 20) {
    damage = 5 + Math.floor(Math.random() * 10);
    const replies = [
      "Hmph... not bad, but you'll need more than that!",
      "A lucky strike! Don't get cocky.",
      "Ouch! ...I mean, that tickled!",
    ];
    response = replies[Math.floor(Math.random() * replies.length)];
  } else {
    damage = 12 + Math.floor(Math.random() * 14);
    const replies = [
      "ARGH! Your words burn like fire!",
      "Impossible... no mortal should wield such power!",
      "I... I felt that one in my soul!",
      "You dare speak to ME like that?! ...it worked.",
    ];
    response = replies[Math.floor(Math.random() * replies.length)];
  }

  return { damage, response };
}

function bossCounterAttack() {
  const bossDamage = 1 + Math.floor(Math.random() * 5);
  state.playerHp = Math.max(0, state.playerHp - bossDamage);
  updateHud();
  triggerScreenShake();

  const counterLines = [
    `The boss slams you for ${bossDamage} damage!`,
    `Boss retaliates with a ${bossDamage}-damage headbutt!`,
    `The boss hurls a pixel at you for ${bossDamage}!`,
    `Boss stomps the ground — you take ${bossDamage} damage!`,
  ];
  const line = counterLines[Math.floor(Math.random() * counterLines.length)];
  showDialogue(line);
}

async function handleSubmit() {
  if (state.busy) return;
  const input = commandInput.value.trim();
  if (!input) return;

  state.busy = true;
  submitBtn.disabled = true;
  commandInput.disabled = true;
  commandInput.value = '';

  const { damage, response } = await sendAttack(input);

  const clampedDamage = Math.min(Math.max(0, Math.round(damage)), 25);
  state.bossHp = Math.max(0, state.bossHp - clampedDamage);
  updateHud();

  if (clampedDamage > 0) {
    triggerBossHit();
    showDamagePopup(clampedDamage);
  }

  showDialogue(response);

  if (state.bossHp <= 0) {
    setTimeout(() => showScreen(victoryScreen), 1500);
    state.busy = false;
    return;
  }

  setTimeout(() => {
    bossCounterAttack();

    if (state.playerHp <= 0) {
      setTimeout(() => showScreen(defeatScreen), 1500);
    }

    state.busy = false;
    submitBtn.disabled = false;
    commandInput.disabled = false;
    commandInput.focus();
  }, 1800);
}

function initBattle() {
  state.bossHp = BOSS_MAX_HP;
  state.playerHp = PLAYER_MAX_HP;
  state.busy = false;
  updateHud();
  dialogueBox.classList.add('hidden');
  damagePopup.classList.add('hidden');
  commandInput.value = '';
  commandInput.disabled = false;
  submitBtn.disabled = false;
  showScreen(battleScreen);
  commandInput.focus();
}

$('#start-btn').addEventListener('click', initBattle);
$('#replay-btn').addEventListener('click', initBattle);
$('#retry-btn').addEventListener('click', initBattle);
submitBtn.addEventListener('click', handleSubmit);
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSubmit();
});
