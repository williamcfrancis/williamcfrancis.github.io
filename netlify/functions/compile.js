const { MODEL_PRIORITY, generateWithModelFallback } = require('./llm');

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
    'projectile_shape', 'trail_density', 'effect_intensity',
    'sound_pitch', 'sound_release',
    'projectile_color', 'trail_color', 'impact_color', 'glow_color',
    'weapon_image_prompt', 'projectile_image_prompt', 'effect_code',
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
    projectile_shape: { type: 'STRING' },
    trail_density: { type: 'NUMBER' },
    effect_intensity: { type: 'NUMBER' },
    sound_pitch: { type: 'NUMBER' },
    sound_release: { type: 'NUMBER' },
    projectile_color: { type: 'STRING' },
    trail_color: { type: 'STRING' },
    impact_color: { type: 'STRING' },
    glow_color: { type: 'STRING' },
    weapon_image_prompt: { type: 'STRING' },
    projectile_image_prompt: { type: 'STRING' },
    effect_code: { type: 'STRING' },
    status_slow: { type: 'NUMBER' },
    status_slow_duration: { type: 'NUMBER' },
    status_dot_dps: { type: 'NUMBER' },
    status_dot_duration: { type: 'NUMBER' },
    status_stun_duration: { type: 'NUMBER' },
    lifesteal: { type: 'NUMBER' },
    splash_radius: { type: 'NUMBER' },
    splash_damage_mult: { type: 'NUMBER' },
    cloud_radius: { type: 'NUMBER' },
    cloud_duration: { type: 'NUMBER' },
    cloud_dps: { type: 'NUMBER' },
    cloud_slow: { type: 'NUMBER' },
    projectile_growth: { type: 'NUMBER' },
    pierce_walls: { type: 'NUMBER' },
    ground_avoidance: { type: 'NUMBER' },
    steering: { type: 'NUMBER' },
    self_damage_on_shoot: { type: 'NUMBER' },
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
    projectile_shape: 'star',
    trail_density: 0.8,
    effect_intensity: 0.75,
    sound_pitch: 1.1,
    sound_release: 0.9,
    projectile_color: '#ffd86b',
    trail_color: '#ff9fd1',
    impact_color: '#fff3ba',
    glow_color: '#ffdca8',
    weapon_image_prompt: null,
    projectile_image_prompt: null,
    effect_code: '',
    status_slow: 0,
    status_slow_duration: 0,
    status_dot_dps: 0,
    status_dot_duration: 0,
    status_stun_duration: 0,
    lifesteal: 0,
    splash_radius: 0,
    splash_damage_mult: 0.4,
    cloud_radius: 0,
    cloud_duration: 0,
    cloud_dps: 0,
    cloud_slow: 0,
    projectile_growth: 0,
    pierce_walls: 0,
    ground_avoidance: 0,
    steering: 0,
    self_damage_on_shoot: 0,
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
    projectile_shape: 'bubble',
    trail_density: 0.95,
    effect_intensity: 0.7,
    sound_pitch: 1.2,
    sound_release: 0.75,
    projectile_color: '#a4d8ff',
    trail_color: '#cdeeff',
    impact_color: '#ffffff',
    glow_color: '#b2f0ff',
    weapon_image_prompt: null,
    projectile_image_prompt: null,
    effect_code: '',
    status_slow: 0.08,
    status_slow_duration: 0.8,
    status_dot_dps: 0,
    status_dot_duration: 0,
    status_stun_duration: 0,
    lifesteal: 0,
    splash_radius: 0,
    splash_damage_mult: 0.4,
    cloud_radius: 0,
    cloud_duration: 0,
    cloud_dps: 0,
    cloud_slow: 0,
    projectile_growth: 0,
    pierce_walls: 0,
    ground_avoidance: 0,
    steering: 0,
    self_damage_on_shoot: 0,
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

const POLLINATIONS_IMAGE_MODEL = 'turbo';
const POLLINATIONS_IMAGE_SIZE = 128;

async function fetchPollinationsImage(prompt, apiKey) {
  const style = 'pixel art, game icon, simple flat, dark background, 16-bit retro, tiny sprite';
  const full = `${prompt}, ${style}`;
  const encoded = encodeURIComponent(full);
  const seed = Math.floor(Math.random() * 999999);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${POLLINATIONS_IMAGE_SIZE}&height=${POLLINATIONS_IMAGE_SIZE}&model=${POLLINATIONS_IMAGE_MODEL}&nologo=true&seed=${seed}&safe=true&private=true`;
  const reqHeaders = {};
  if (apiKey) reqHeaders['Authorization'] = `Bearer ${apiKey}`;
  try {
    const res = await fetch(url, { headers: reqHeaders, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`pollinations ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch (e) {
    console.warn('[compile] Image fetch failed:', e.message);
    return null;
  }
}

function requestExplicitlyWantsTracking(requestText) {
  const text = String(requestText || '').toLowerCase();
  const trackingSignals = [
    'homing', 'home in', 'seeking', 'seek', 'tracking', 'track',
    'guided', 'guide', 'lock on', 'lock-on', 'auto aim', 'auto-aim',
    'target bounce', 'chase projectile', 'chasing projectile',
    'remote', 'steer', 'steering',
  ];
  return trackingSignals.some(signal => text.includes(signal));
}

function clampWeapon(mod, requestText) {
  const wantsTracking = requestExplicitlyWantsTracking(requestText);
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
    bullet_homing: wantsTracking ? clamp(mod.bullet_homing, 0, 0.5) : 0,
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
    projectile_shape: String(mod.projectile_shape || 'orb').slice(0, 20).toLowerCase(),
    trail_density: clamp(mod.trail_density, 0.2, 2),
    effect_intensity: clamp(mod.effect_intensity, 0.2, 2),
    sound_pitch: clamp(mod.sound_pitch, 0.5, 2),
    sound_release: clamp(mod.sound_release, 0.5, 2),
    projectile_color: sanitizeHex(mod.projectile_color, '#ffd86b'),
    trail_color: sanitizeHex(mod.trail_color, '#ffc9e8'),
    impact_color: sanitizeHex(mod.impact_color, '#fff3ba'),
    glow_color: sanitizeHex(mod.glow_color, '#ffe8aa'),
    weapon_image_prompt: String(mod.weapon_image_prompt || '').slice(0, 200),
    projectile_image_prompt: String(mod.projectile_image_prompt || '').slice(0, 200),
    effect_code: sanitizeEffectCode(mod.effect_code),
    status_slow: clamp(mod.status_slow, 0, 0.75),
    status_slow_duration: clamp(mod.status_slow_duration, 0, 4),
    status_dot_dps: clamp(mod.status_dot_dps, 0, 14),
    status_dot_duration: clamp(mod.status_dot_duration, 0, 7),
    status_stun_duration: clamp(mod.status_stun_duration, 0, 1.5),
    lifesteal: clamp(mod.lifesteal, 0, 1),
    splash_radius: clamp(mod.splash_radius, 0, 130),
    splash_damage_mult: clamp(mod.splash_damage_mult, 0, 1),
    cloud_radius: clamp(mod.cloud_radius, 0, 140),
    cloud_duration: clamp(mod.cloud_duration, 0, 6),
    cloud_dps: clamp(mod.cloud_dps, 0, 12),
    cloud_slow: clamp(mod.cloud_slow, 0, 0.6),
    projectile_growth: clamp(mod.projectile_growth, 0, 2),
    pierce_walls: Math.round(clamp(mod.pierce_walls, 0, 1)),
    ground_avoidance: clamp(mod.ground_avoidance, 0, 1),
    steering: wantsTracking ? clamp(mod.steering, 0, 1) : 0,
    self_damage_on_shoot: clamp(mod.self_damage_on_shoot, 0, 25),
  };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, Number(v) || lo)); }

const VALID_EFFECTS = new Set([
  'glow', 'orbit', 'pulse', 'flame', 'frost', 'electric', 'holy',
  'shadow', 'nature', 'ripple', 'crystal', 'chaos', 'void_effect', 'rainbow',
]);

function sanitizeEffectCode(code) {
  const s = String(code || '').trim().toLowerCase().replace(/[^a-z_]/g, '');
  return VALID_EFFECTS.has(s) ? s : 'glow';
}

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
    request = (body.request || '').slice(0, 800);
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

IMAGE PROMPT REQUIREMENTS:
- weapon_image_prompt: a short English phrase (max 30 words) describing the held weapon as a tiny game icon.
  Focus on shape, material, and color. Example: "golden wand with pink crystal tip" or "rustic kettle with bubbles".
- projectile_image_prompt: a short English phrase (max 30 words) describing the projectile as a tiny game icon.
  Focus on shape and glow. Example: "glowing pink star orb" or "translucent blue bubble".
- These prompts feed an AI image generator, so be vivid and concise.

PROJECTILE EFFECT OVERLAY:
- effect_code: choose exactly ONE from the following predefined effect names:
  glow, orbit, pulse, flame, frost, electric, holy, shadow, nature, ripple, crystal, chaos, void_effect, rainbow
- This draws a visual overlay OVER the projectile image to add flair.
- Match the effect to the weapon concept:
  fire/lava/dragon → flame, ice/frost/snow → frost, lightning/shock → electric,
  holy/divine/light → holy, dark/shadow/void → shadow or void_effect,
  nature/leaf/wood → nature, water/wave/ocean → ripple, crystal/gem/glass → crystal,
  chaos/random/wild → chaos, magical/enchanted → glow or orbit,
  heartbeat/living → pulse, prismatic/rainbow → rainbow

SFX/VFX MAPPING HINTS:
- trail_style one of: sparkle, petals, bubbles, smoke, leaf, rainbow, ember
- impact_style one of: sparkles, puff, splash, pop, burst
- sound_profile one of: chime, flute, bell, bubble, twig, horn, pop, crystal, drum, harp, whoosh, crackle
- projectile_shape one of: orb, shard, star, crescent, heart, bolt, petal, bubble, leaf, gem, rune, comet
- trail_density: 0.2 to 2.0 (more particles and longer trail)
- effect_intensity: 0.2 to 2.0 (impact pop and glow strength)
- sound_pitch: 0.5 to 2.0 (0.5 low/deep, 2.0 high/cute)
- sound_release: 0.5 to 2.0 (0.5 short/snappy, 2.0 long/ringing)
- projectile/trail/impact/glow colors should match the wish concept.
- status_slow/status_slow_duration for chilling or slowing effects.
- status_dot_dps/status_dot_duration for poison/burn/parasite style effects.
- status_stun_duration for dazzle/shock style effects.
- lifesteal for leech style effects.
- splash_radius/splash_damage_mult for explosive effects.
- cloud_radius/cloud_duration/cloud_dps/cloud_slow for toxic/static field effects.
- projectile_growth for "grow over distance".
- pierce_walls for drill-through style shots.
- ground_avoidance for sneaky hovering shots.
- steering for remote-guided feeling.
- self_damage_on_shoot for demonic pact style designs.

PROMPT INTERPRETATION:
- Honor nouns and adjectives from player text literally.
- If request is absurd, make it absurd but coherent.
- If request is not a weapon, reinterpret as magical launcher version of that thing.
- Preserve creative intent over familiarity: do not "normalize" strange wishes into generic wands/guns unless explicitly requested.
- Favor faithful translation of unique materials, mood, and symbolism even when unusual.
- Prioritize silhouette recognizability over abstract patterning.
- If the request includes materials (wooden, crystal, golden, icy), reflect those in both palette and sound_profile.
- If request includes emotion (angry, calm, playful), reflect it in projectile_shape, trail_style, sound_pitch and sound_release.
- The effect system should be composable: combine 2-4 mechanics when requested.
- Do NOT reference named cards/powerups. Translate intent into mechanics directly.
- IMPORTANT: Do NOT add tracking by default.
- bullet_homing and steering must be 0 unless the player explicitly asks for homing/seeking/tracking/guided/remote-steered behavior.

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

  try {
    const { data, model } = await generateWithModelFallback({
      apiKey: GEMINI_API_KEY,
      attemptsPerModel: 2,
      requestBodyFactory: ({ attempt }) => ({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: `Player request: "${request}"` }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA,
          temperature: attempt === 0 ? 1.0 : 0.7,
          maxOutputTokens: 2048,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    console.log('[compile] Success model:', model, 'request:', request.slice(0, 80));
    const raw = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
    console.log('[compile] Raw:', raw.slice(0, 200));

    const parsed = JSON.parse(raw);
    const mod = clampWeapon(parsed, request);

    const POLLINATIONS_KEY = process.env.POLLINATIONSAI_API_KEY || null;
    const [weaponImg, projImg] = await Promise.all([
      mod.weapon_image_prompt ? fetchPollinationsImage(mod.weapon_image_prompt, POLLINATIONS_KEY) : null,
      mod.projectile_image_prompt ? fetchPollinationsImage(mod.projectile_image_prompt, POLLINATIONS_KEY) : null,
    ]);
    mod.weapon_image_url = weaponImg;
    mod.projectile_image_url = projImg;

    return { statusCode: 200, headers: headers(), body: JSON.stringify({ mod }) };
  } catch (err) {
    const details = Array.isArray(err?.details) ? err.details : [];
    const resolvedModelOrder = Array.isArray(err?.modelOrder) && err.modelOrder.length > 0
      ? err.modelOrder
      : MODEL_PRIORITY;
    console.error('[compile] All model attempts failed:', JSON.stringify(details));
    const fb = FALLBACK_WEAPONS[Math.floor(Math.random() * FALLBACK_WEAPONS.length)];
    return {
      statusCode: 200,
      headers: headers(),
      body: JSON.stringify({
        mod: fb,
        _debug: {
          error: err?.message || 'Model fallback chain failed',
          modelsTried: resolvedModelOrder,
          attempts: details,
        },
      }),
    };
  }
};
