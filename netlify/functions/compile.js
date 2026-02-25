const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  required: [
    'name', 'quip', 'tradeoff',
    'weapon_kind', 'fantasy_flair',
    'bullet_size', 'bullet_speed', 'bullet_damage',
    'bullet_count', 'bullet_spread', 'bullet_bounces', 'bullet_homing',
    'fire_rate', 'move_speed', 'jump_power', 'player_gravity',
    'player_size', 'on_bounce_split', 'knockback_power', 'hp_bonus',
    'regen', 'trail_style', 'impact_style', 'sound_profile',
    'projectile_color', 'trail_color', 'impact_color', 'glow_color',
    'pixel_rows', 'palette',
  ],
  properties: {
    name: { type: 'STRING' },
    quip: { type: 'STRING' },
    tradeoff: { type: 'STRING' },
    weapon_kind: { type: 'STRING' },
    fantasy_flair: { type: 'STRING' },
    bullet_size: { type: 'NUMBER' },
    bullet_speed: { type: 'NUMBER' },
    bullet_damage: { type: 'NUMBER' },
    bullet_count: { type: 'NUMBER' },
    bullet_spread: { type: 'NUMBER' },
    bullet_bounces: { type: 'NUMBER' },
    bullet_homing: { type: 'NUMBER' },
    fire_rate: { type: 'NUMBER' },
    move_speed: { type: 'NUMBER' },
    jump_power: { type: 'NUMBER' },
    player_gravity: { type: 'NUMBER' },
    player_size: { type: 'NUMBER' },
    on_bounce_split: { type: 'NUMBER' },
    knockback_power: { type: 'NUMBER' },
    hp_bonus: { type: 'NUMBER' },
    regen: { type: 'NUMBER' },
    trail_style: { type: 'STRING' },
    impact_style: { type: 'STRING' },
    sound_profile: { type: 'STRING' },
    projectile_color: { type: 'STRING' },
    trail_color: { type: 'STRING' },
    impact_color: { type: 'STRING' },
    glow_color: { type: 'STRING' },
    pixel_rows: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    palette: {
      type: 'OBJECT',
      properties: {
        A: { type: 'STRING' },
        B: { type: 'STRING' },
        C: { type: 'STRING' },
        D: { type: 'STRING' },
      },
    },
  },
};

const FALLBACK_WEAPONS = [
  {
    name: 'Star Petal Wand',
    quip: 'Whispered to the moon. It answered.',
    tradeoff: 'Powerful tracking, but shots travel slowly.',
    weapon_kind: 'wand',
    fantasy_flair: 'Floral stardust trails',
    bullet_size: 0.9,
    bullet_speed: 0.7,
    bullet_damage: 1.1,
    bullet_count: 2,
    bullet_spread: 12,
    bullet_bounces: 0,
    bullet_homing: 0.22,
    fire_rate: 0.9,
    move_speed: 1,
    jump_power: 1,
    player_gravity: 1,
    player_size: 1,
    on_bounce_split: 0,
    knockback_power: 1,
    hp_bonus: 0,
    regen: 0.3,
    trail_style: 'petals',
    impact_style: 'sparkles',
    sound_profile: 'chime',
    projectile_color: '#ffd86b',
    trail_color: '#ff9fd1',
    impact_color: '#fff3ba',
    glow_color: '#ffdca8',
    pixel_rows: ['.AB.', 'ACB.', '.CD.', '..D.'],
    palette: { A: '#ffe59d', B: '#ffb870', C: '#f58ec4', D: '#8e5ed6' },
  },
  {
    name: 'Bubble Kettle',
    quip: 'Tea time, but make it ballistic.',
    tradeoff: 'Cute bubbles hit softly.',
    weapon_kind: 'kettle',
    fantasy_flair: 'Pastel bubbles',
    bullet_size: 1.3,
    bullet_speed: 0.8,
    bullet_damage: 0.7,
    bullet_count: 3,
    bullet_spread: 22,
    bullet_bounces: 1,
    bullet_homing: 0,
    fire_rate: 1.2,
    move_speed: 1.05,
    jump_power: 1,
    player_gravity: 1,
    player_size: 1,
    on_bounce_split: 0,
    knockback_power: 0.8,
    hp_bonus: 10,
    regen: 0,
    trail_style: 'bubbles',
    impact_style: 'puff',
    sound_profile: 'bubble',
    projectile_color: '#a4d8ff',
    trail_color: '#cdeeff',
    impact_color: '#ffffff',
    glow_color: '#b2f0ff',
    pixel_rows: ['.AA.', 'ABBA', '.CC.', '..D.'],
    palette: { A: '#9ad0ff', B: '#5fa8ff', C: '#ffd6ea', D: '#8d63d2' },
  },
];

function headers() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function sanitizeHex(hex, fallback) {
  const v = String(hex || '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
}

function normalizeRows(rows) {
  const fallback = ['.AA.', '.BC.', '.CD.', '..D.'];
  if (!Array.isArray(rows) || rows.length !== 4) return fallback;
  return rows.map((row, idx) => {
    const s = String(row || '').toUpperCase().slice(0, 4).padEnd(4, '.');
    const cleaned = s.replace(/[^ABCD.]/g, '.');
    return cleaned.length === 4 ? cleaned : fallback[idx];
  });
}

function clampWeapon(mod) {
  return {
    name: String(mod.name || 'Wished Relic').slice(0, 60),
    quip: String(mod.quip || 'The stars shrugged and granted it anyway.').slice(0, 150),
    tradeoff: String(mod.tradeoff || '').slice(0, 150),
    weapon_kind: String(mod.weapon_kind || 'artifact').slice(0, 30),
    fantasy_flair: String(mod.fantasy_flair || '').slice(0, 120),
    bullet_size: clamp(mod.bullet_size, 0.2, 6),
    bullet_speed: clamp(mod.bullet_speed, 0.2, 3.5),
    bullet_damage: clamp(mod.bullet_damage, 0.2, 3.5),
    bullet_count: Math.round(clamp(mod.bullet_count, 1, 7)),
    bullet_spread: clamp(mod.bullet_spread, 0, 50),
    bullet_bounces: Math.round(clamp(mod.bullet_bounces, 0, 6)),
    bullet_homing: clamp(mod.bullet_homing, 0, 0.5),
    fire_rate: clamp(mod.fire_rate, 0.2, 3.5),
    move_speed: clamp(mod.move_speed, 0.25, 2.5),
    jump_power: clamp(mod.jump_power, 0.25, 2.5),
    player_gravity: clamp(mod.player_gravity, 0.25, 2.5),
    player_size: clamp(mod.player_size, 0.4, 2.2),
    on_bounce_split: Math.round(clamp(mod.on_bounce_split, 0, 4)),
    knockback_power: clamp(mod.knockback_power, 0.3, 5),
    hp_bonus: Math.round(clamp(mod.hp_bonus, -40, 60)),
    regen: clamp(mod.regen, 0, 4),
    trail_style: String(mod.trail_style || 'sparkle').slice(0, 20).toLowerCase(),
    impact_style: String(mod.impact_style || 'sparkles').slice(0, 20).toLowerCase(),
    sound_profile: String(mod.sound_profile || 'chime').slice(0, 20).toLowerCase(),
    projectile_color: sanitizeHex(mod.projectile_color, '#ffd86b'),
    trail_color: sanitizeHex(mod.trail_color, '#ffc9e8'),
    impact_color: sanitizeHex(mod.impact_color, '#fff3ba'),
    glow_color: sanitizeHex(mod.glow_color, '#ffe8aa'),
    pixel_rows: normalizeRows(mod.pixel_rows),
    palette: {
      A: sanitizeHex(mod.palette?.A, '#ffe59d'),
      B: sanitizeHex(mod.palette?.B, '#ffb870'),
      C: sanitizeHex(mod.palette?.C, '#f58ec4'),
      D: sanitizeHex(mod.palette?.D, '#8e5ed6'),
    },
  };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, Number(v) || lo)); }

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { ...headers(), 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: headers(), body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('[compile] GEMINI_API_KEY not set');
    const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
    return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: 'No API key' } }) };
  }

  let request, existingMods, roundNum;
  try {
    const body = JSON.parse(event.body);
    request = (body.request || '').slice(0, 400);
    existingMods = Array.isArray(body.existingMods) ? body.existingMods.slice(-5) : [];
    roundNum = Number(body.round) || 1;
  } catch (e) {
    console.error('[compile] Bad body:', e.message);
    const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
    return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: e.message } }) };
  }

  const existingDesc = existingMods.length > 0
    ? `The player currently wields: "${existingMods[existingMods.length - 1]?.name || 'unknown relic'}". Their last wish tradeoff: "${existingMods[existingMods.length - 1]?.tradeoff || 'none'}".`
    : 'The player has no weapon wish yet.';

  const systemPrompt = `You are the WISH FORGE SPIRIT in a colorful fantasy 1v1 arena.

GAME MECHANICS:
- 2 players on floating platforms. Base projectile does 10 damage. 100 HP each.
- Loser of each round is granted ONE wish that becomes their NEW weapon.
- This is NOT additive stacking. The wish replaces their previous weapon.
- Requests can be weapons OR silly non-weapons (teacup, cloud, violin, sandwich). Everything is valid if made battle-usable.

THIS IS ROUND ${roundNum}. ${existingDesc}

BALANCE RULE:
Every strong fantasy effect needs a clear downside. The weapon should feel true to description but still fair.
Example:
- "Dragon cannon" => high damage + knockback, but slow fire_rate and slow move_speed.
- "Fairy dust wand" => fast rate + homing, but low damage.
- "Huge castle launcher" => high bullet_size and hp_bonus, but larger player_size and slower jump.

PIXEL ART WEAPON REQUIREMENTS (strict):
- Return pixel_rows as exactly 4 strings, each exactly 4 chars.
- Allowed chars: A B C D .
- "." means transparent.
- Build a readable tiny icon silhouette in 4x4.
- palette provides HEX colors for A/B/C/D.
- Use warm, cute, storybook fantasy colors (avoid harsh cyber neon).

SFX/VFX MAPPING HINTS:
- trail_style one of: sparkle, petals, bubbles, smoke, leaf, rainbow, ember
- impact_style one of: sparkles, puff, splash, pop, burst
- sound_profile one of: chime, flute, bell, bubble, twig, horn, pop
- projectile/trail/impact/glow colors should match the wish concept.

PROMPT INTERPRETATION:
- Honor nouns and adjectives from player text literally.
- If request is absurd, make it absurd but coherent.
- If request is not a weapon, reinterpret as magical launcher version of that thing.

MODIFIER RANGES (values outside these will be clamped):
- bullet_size: 0.2–6.0 (multiplier, 1.0=default)
- bullet_speed: 0.2–3.5 (multiplier)
- bullet_damage: 0.2–3.5 (multiplier)
- bullet_count: 1–7 (integer, bullets per shot)
- bullet_spread: 0–50 (degrees)
- bullet_bounces: 0–6 (wall bounces before bullet dies)
- bullet_homing: 0–0.5 (turn rate toward enemy, 0=none)
- fire_rate: 0.2–3.5 (multiplier, higher=faster shooting)
- move_speed: 0.25–2.5 (multiplier)
- jump_power: 0.25–2.5 (multiplier)
- player_gravity: 0.25–2.5 (multiplier, lower=floatier)
- player_size: 0.4–2.2 (multiplier, bigger=easier to hit)
- on_bounce_split: 0–4 (child bullets spawned per bounce)
- knockback_power: 0.3–5.0 (multiplier)
- hp_bonus: -40 to 60 (added to max HP)
- regen: 0–4 (HP per second)

VOICE:
- Whimsical, warm, fairy-tale blacksmith spirit.
- "name": 2-4 words.
- "quip": short magical one-liner.
- "tradeoff": clear downside sentence.
- "fantasy_flair": short phrase used in HUD.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      console.log('[compile] Attempt', attempt + 1, 'request:', request.slice(0, 80));
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: `Player request: "${request}"` }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
            temperature: attempt === 0 ? 1.0 : 0.3,
            maxOutputTokens: 2048,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      });

      if (res.status === 429) {
        console.warn('[compile] Rate limited');
        const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
        return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: '429 rate limit' } }) };
      }
      if (!res.ok) {
        const errText = await res.text();
        console.error('[compile] Gemini error:', res.status, errText.slice(0, 300));
        if (attempt === 1) {
          const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
          return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: `Gemini ${res.status}`, detail: errText.slice(0, 300) } }) };
        }
        continue;
      }

      const data = await res.json();
      const raw = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
      console.log('[compile] Raw:', raw.slice(0, 200));

      const parsed = JSON.parse(raw);
      const mod = clampWeapon(parsed);
      return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod }) };
    } catch (err) {
      console.error('[compile] Error on attempt', attempt + 1, ':', err.message);
      if (attempt === 1) {
        const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
        return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: err.message } }) };
      }
    }
  }
};
