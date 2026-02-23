const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  required: [
    'name', 'quip', 'bullet_size', 'bullet_speed', 'bullet_damage',
    'bullet_count', 'bullet_spread', 'bullet_bounces', 'bullet_homing',
    'fire_rate', 'move_speed', 'jump_power', 'player_gravity',
    'player_size', 'on_bounce_split', 'knockback_power', 'hp_bonus',
    'regen', 'tradeoff',
  ],
  properties: {
    name: { type: 'STRING' },
    quip: { type: 'STRING' },
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
    tradeoff: { type: 'STRING' },
  },
};

const FALLBACK_MODS = [
  { name:"Scattershot", quip:"More barrels, more problems.", bullet_size:0.7, bullet_speed:0.9, bullet_damage:0.6, bullet_count:4, bullet_spread:30, bullet_bounces:0, bullet_homing:0, fire_rate:0.7, move_speed:0.9, jump_power:1, player_gravity:1, player_size:1, on_bounce_split:0, knockback_power:0.8, hp_bonus:0, regen:0, tradeoff:"Each pellet does less damage" },
  { name:"Sniper Mode", quip:"One shot. Make it count.", bullet_size:0.4, bullet_speed:2.5, bullet_damage:2.8, bullet_count:1, bullet_spread:0, bullet_bounces:0, bullet_homing:0, fire_rate:0.25, move_speed:0.6, jump_power:0.8, player_gravity:1, player_size:1, on_bounce_split:0, knockback_power:2, hp_bonus:0, regen:0, tradeoff:"Glacial fire rate and slow movement" },
  { name:"Rubber Madness", quip:"Boing. Boing. BOING.", bullet_size:1.3, bullet_speed:0.7, bullet_damage:0.7, bullet_count:1, bullet_spread:0, bullet_bounces:4, bullet_homing:0, fire_rate:1.2, move_speed:1, jump_power:1, player_gravity:1, player_size:1, on_bounce_split:0, knockback_power:1, hp_bonus:0, regen:0, tradeoff:"Reduced damage and slower bullets" },
  { name:"Homing Swarm", quip:"They always find you.", bullet_size:0.5, bullet_speed:0.6, bullet_damage:0.5, bullet_count:3, bullet_spread:40, bullet_bounces:0, bullet_homing:0.35, fire_rate:0.6, move_speed:0.85, jump_power:1, player_gravity:1, player_size:1, on_bounce_split:0, knockback_power:0.6, hp_bonus:0, regen:0, tradeoff:"Weak damage and slow fire rate" },
  { name:"Glass Cannon", quip:"All offense, no defense.", bullet_size:1.5, bullet_speed:1.5, bullet_damage:2.2, bullet_count:1, bullet_spread:0, bullet_bounces:0, bullet_homing:0, fire_rate:1.5, move_speed:1.3, jump_power:1.2, player_gravity:1, player_size:1.3, on_bounce_split:0, knockback_power:1.5, hp_bonus:-30, regen:0, tradeoff:"Much less HP and bigger hitbox" },
  { name:"Bouncing Betty", quip:"Geometry is violence.", bullet_size:0.8, bullet_speed:0.8, bullet_damage:0.8, bullet_count:1, bullet_spread:0, bullet_bounces:3, bullet_homing:0, fire_rate:1, move_speed:1, jump_power:1, player_gravity:1, player_size:1, on_bounce_split:2, knockback_power:0.8, hp_bonus:0, regen:0, tradeoff:"Base bullets are weaker" },
  { name:"Moon Boots", quip:"Gravity is optional.", bullet_size:1, bullet_speed:1, bullet_damage:1, bullet_count:1, bullet_spread:0, bullet_bounces:0, bullet_homing:0, fire_rate:0.8, move_speed:0.8, jump_power:2.2, player_gravity:0.4, player_size:1, on_bounce_split:0, knockback_power:1.5, hp_bonus:10, regen:0, tradeoff:"Harder to control in air, slower on ground" },
  { name:"Tank Mode", quip:"Slow and unstoppable.", bullet_size:2, bullet_speed:0.5, bullet_damage:1.8, bullet_count:1, bullet_spread:0, bullet_bounces:1, bullet_homing:0, fire_rate:0.5, move_speed:0.5, jump_power:0.6, player_gravity:1.3, player_size:1.4, on_bounce_split:0, knockback_power:3, hp_bonus:40, regen:1, tradeoff:"Extremely slow movement and fire rate" },
];

function headers() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function clampMod(mod) {
  return {
    name: String(mod.name || 'Junk Code').slice(0, 60),
    quip: String(mod.quip || 'It compiled... somehow.').slice(0, 150),
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
    tradeoff: String(mod.tradeoff || '').slice(0, 150),
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
    const fb = FALLBACK_MODS[Math.floor(Math.random() * FALLBACK_MODS.length)];
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
    const fb = FALLBACK_MODS[Math.floor(Math.random() * FALLBACK_MODS.length)];
    return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: e.message } }) };
  }

  const existingDesc = existingMods.length > 0
    ? `The player already has these mods stacked:\n${existingMods.map((m, i) => `${i + 1}. "${m.name}" — ${m.tradeoff}`).join('\n')}\nConsider synergies and avoid making them completely invincible.`
    : 'The player has no mods yet.';

  const systemPrompt = `You are THE COMPILER in "Junkcode Brawlers," a chaotic 1v1 arena shooter. Players describe weapon modifications in plain English and you translate them into balanced game modifier values.

GAME MECHANICS:
- 2 players on platforms. Base bullet does 10 damage, 100 HP each.
- Players: move, jump, shoot a scrap pistol. Fall off = death.
- Loser of a round gets to compile a mod. Mods STACK across rounds.

THIS IS ROUND ${roundNum}. ${existingDesc}

BALANCE — THE LAW OF EQUIVALENT EXCHANGE:
Every powerful buff MUST have a meaningful, thematic tradeoff. Examples:
- "Instant kill bullets" → high damage, but fire_rate:0.2 and move_speed:0.3 (you're a slow turret)
- "Invincibility" → hp_bonus:60 + regen:4, but bullet_damage:0.2 and player_size:2.0 (harmless blob)
- "Homing missiles" → bullet_homing:0.4, but bullet_speed:0.5 and fire_rate:0.5 (slow and few)
If the request is vague or silly, be creative and add a humorous twist. If it's contradictory, create "junk code" with random funny effects.

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

PERSONALITY: You're a gruff, sardonic industrial compiler. Your "quip" should be a short, witty one-liner about the compiled code — like a sarcastic compiler warning. Keep "name" punchy (2-4 words). "tradeoff" is a short player-visible description of the downside.`;

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
        const fb = FALLBACK_MODS[Math.floor(Math.random() * FALLBACK_MODS.length)];
        return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: '429 rate limit' } }) };
      }
      if (!res.ok) {
        const errText = await res.text();
        console.error('[compile] Gemini error:', res.status, errText.slice(0, 300));
        if (attempt === 1) {
          const fb = FALLBACK_MODS[Math.floor(Math.random() * FALLBACK_MODS.length)];
          return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: `Gemini ${res.status}`, detail: errText.slice(0, 300) } }) };
        }
        continue;
      }

      const data = await res.json();
      const raw = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
      console.log('[compile] Raw:', raw.slice(0, 200));

      const parsed = JSON.parse(raw);
      const mod = clampMod(parsed);
      return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod }) };
    } catch (err) {
      console.error('[compile] Error on attempt', attempt + 1, ':', err.message);
      if (attempt === 1) {
        const fb = FALLBACK_MODS[Math.floor(Math.random() * FALLBACK_MODS.length)];
        return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod: fb, _debug: { error: err.message } }) };
      }
    }
  }
};
