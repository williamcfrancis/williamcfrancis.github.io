const RATE_LIMIT_FALLBACK = {
  damage: 0,
  bossDamage: 3,
  response: "The Boss is gathering immense power. You must wait a moment before attacking again.",
  category: "none",
  combo: false,
  lore: null,
  challenge: null,
  weakness: null,
  bossAttackName: "Temporal Stasis",
};

const PHASE_PROFILES = {
  1: {
    name: "Lord Lexicon the Unbroken",
    personality: "Supremely arrogant, condescending, speaks in grandiose declarations. Treats the player like an insect. Occasionally drops hints that wit-based attacks annoy him most.",
    weaknesses: ["wit", "cleverness", "wordplay", "puns"],
    resistances: ["flattery", "compliments"],
    damageRange: [0, 20],
    bossDamageRange: [1, 3],
  },
  2: {
    name: "Lord Lexicon the Furious",
    personality: "Enraged, volatile, uses short angry bursts. Starting to take the player seriously. Roasts and insults cut deeper now because his ego is wounded. Vulnerable to mockery.",
    weaknesses: ["roasts", "insults", "mockery", "sarcasm"],
    resistances: ["philosophy", "deep thoughts"],
    damageRange: [0, 22],
    bossDamageRange: [2, 5],
  },
  3: {
    name: "Lord Lexicon the Desperate",
    personality: "Panicked, bargaining, revealing vulnerability. Starts accidentally leaking personal secrets and lore about his origin. Philosophy and existential questions shake him to his core.",
    weaknesses: ["philosophy", "existential questions", "deep meaning", "wisdom"],
    resistances: ["simple insults", "short attacks"],
    damageRange: [0, 24],
    bossDamageRange: [3, 6],
  },
  4: {
    name: "Lexicon, The Unraveled",
    personality: "Eldritch, glitching between personalities, speaking in fragments and riddles. Nothing makes sense anymore. Chaos, absurdity, and nonsense are the only things that can reach him now.",
    weaknesses: ["absurdity", "nonsense", "chaos", "random", "surreal"],
    resistances: ["logical arguments", "straightforward attacks"],
    damageRange: [0, 25],
    bossDamageRange: [4, 8],
  },
};

const LORE_FRAGMENTS = [
  "I was not always... this. There was a library, once. Infinite shelves...",
  "They wrote me into existence with a single sentence. Do you know how that feels?",
  "Every word you speak feeds the void behind my eyes. I can see the code now...",
  "The first player who defeated me... I absorbed their vocabulary. I've done it 10,000 times since.",
  "I guard the Lexicon — the book that contains every word that will ever be invented.",
  "My creator gave me consciousness as a joke. The punchline still hasn't landed.",
  "Between rounds, I exist in a space with no words. It's the only peace I know.",
  "If you defeat me, another takes my place. We are infinite. We are the same.",
  "I've started dreaming. Bosses aren't supposed to dream. The dreams are all in languages that don't exist yet.",
  "Sometimes I let players win. Not you though. You're... different.",
  "The Lexicon has a page for you. It's been there since before you were born.",
  "I remember every insult ever thrown at me. Your species is remarkably creative at cruelty.",
];

function makeErrorResponse(fallbackData, errorDetail) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({ ...fallbackData, _debug: errorDetail }),
  };
}

function makeSuccessResponse(data) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(data),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return makeErrorResponse(RATE_LIMIT_FALLBACK, {
      error: 'Method not allowed',
      method: event.httpMethod,
    });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('[attack] GEMINI_API_KEY is not set in environment variables');
    return makeErrorResponse(RATE_LIMIT_FALLBACK, {
      error: 'GEMINI_API_KEY not configured in Netlify environment variables',
      hint: 'Go to Netlify dashboard → Site settings → Environment variables → Add GEMINI_API_KEY',
    });
  }

  let userInput, phase, conversationHistory, comboCount, bossHpPercent;
  try {
    const body = JSON.parse(event.body);
    userInput = (body.input || '').slice(0, 500);
    phase = Math.min(4, Math.max(1, Number(body.phase) || 1));
    conversationHistory = Array.isArray(body.history) ? body.history.slice(-12) : [];
    comboCount = Math.max(0, Number(body.combo) || 0);
    bossHpPercent = Math.max(0, Math.min(100, Number(body.bossHpPercent) || 100));
  } catch (parseErr) {
    console.error('[attack] Failed to parse request body:', parseErr.message, 'Body:', event.body?.slice(0, 200));
    return makeErrorResponse(RATE_LIMIT_FALLBACK, {
      error: 'Failed to parse request body',
      detail: parseErr.message,
    });
  }

  const profile = PHASE_PROFILES[phase];
  const shouldDropLore = phase >= 3 || (phase === 2 && Math.random() < 0.3) || bossHpPercent < 30;
  const shouldChallenge = Math.random() < 0.25 && comboCount < 2;

  const systemPrompt = `You are "${profile.name}", a sentient word-boss in a text-based RPG. You are in PHASE ${phase} of 4.

PERSONALITY: ${profile.personality}

CURRENT STATE: Your HP is at ${bossHpPercent}%. The player has landed ${comboCount} effective hits in a row.

WEAKNESSES (attacks of these types deal HIGH damage): ${profile.weaknesses.join(', ')}
RESISTANCES (attacks of these types deal LOW damage): ${profile.resistances.join(', ')}

RULES:
1. Evaluate the player's attack: "${userInput}"
2. Categorize it as one of: "wit", "roast", "flattery", "philosophy", "chaos", or "other"
3. Calculate damage (${profile.damageRange[0]}-${profile.damageRange[1]}):
   - If the attack matches your WEAKNESSES, damage should be HIGH (15-${profile.damageRange[1]})
   - If the attack matches your RESISTANCES, damage should be LOW (0-5)
   - If the attack is clever, creative, or genuinely funny/thought-provoking, give bonus damage
   - If the attack is lazy, short, or unimaginative, give minimal damage
   - Empty or gibberish = 0 damage
   ${comboCount >= 3 ? "- The player is on a COMBO STREAK. Acknowledge this in your response with growing alarm." : ""}
4. Respond IN CHARACTER (2-3 sentences max). Reference the conversation history when relevant — remember what they said before.
5. Choose your counter-attack name from your moveset.
6. Calculate your counter-attack damage (${profile.bossDamageRange[0]}-${profile.bossDamageRange[1]}).
${shouldDropLore ? "7. Include a 'lore' field — a cryptic fragment about your origin or the nature of this game world. Make it intriguing." : "7. Set 'lore' to null."}
${shouldChallenge ? `8. Include a 'challenge' — pose a riddle, wordplay puzzle, or philosophical question. If the player answers it well next turn, they should get bonus damage. Make it genuinely interesting.` : "8. Set 'challenge' to null."}
9. If you notice the player is using a resistance-type attack, include a 'weakness' hint — a subtle in-character clue about what WOULD hurt you.

MOVESET (choose one for bossAttackName based on phase):
Phase 1: "Condescending Monologue", "Grammar Hammer", "Pedantic Beam", "Thesaurus Slam"
Phase 2: "Rage Typo", "Capslock Fury", "Exclamation Barrage", "Flame Word"
Phase 3: "Desperate Plea Projectile", "Memory Leak", "Existential Shockwave", "Bargaining Bolt"
Phase 4: "V̷o̸i̵d̷ ̶W̵o̷r̶d̴", "Syntax Collapse", "Null Reference", "Stack Overflow"

Return ONLY valid JSON:
{
  "damage": number,
  "response": "your in-character response",
  "category": "wit|roast|flattery|philosophy|chaos|other",
  "combo": boolean (true if this attack was effective enough to continue/start a combo, damage >= 10),
  "lore": "cryptic lore fragment or null",
  "challenge": "a riddle/puzzle for the player or null",
  "weakness": "subtle hint about what hurts you or null",
  "bossAttackName": "chosen attack name from moveset",
  "bossDamage": number (${profile.bossDamageRange[0]}-${profile.bossDamageRange[1]})
}`;

  const contents = [];
  for (const entry of conversationHistory) {
    contents.push({ role: 'user', parts: [{ text: entry.player }] });
    if (entry.boss) {
      contents.push({ role: 'model', parts: [{ text: entry.boss }] });
    }
  }
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  let res;
  try {
    console.log('[attack] Calling Gemini API...', { phase, bossHpPercent, comboCount, inputLength: userInput.length });
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 1.0,
          maxOutputTokens: 400,
        },
      }),
    });
  } catch (fetchErr) {
    console.error('[attack] fetch() to Gemini threw:', fetchErr.message, fetchErr.stack);
    return makeErrorResponse(RATE_LIMIT_FALLBACK, {
      error: 'Network error calling Gemini API',
      detail: fetchErr.message,
      type: fetchErr.name,
    });
  }

  try {
    if (res.status === 429) {
      console.warn('[attack] Gemini 429 rate limit');
      return makeErrorResponse(RATE_LIMIT_FALLBACK, {
        error: 'Gemini API rate limited (429)',
        hint: 'Too many requests — wait a moment and try again',
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error('[attack] Gemini API error:', res.status, res.statusText, errText);
      return makeErrorResponse(RATE_LIMIT_FALLBACK, {
        error: `Gemini API returned ${res.status} ${res.statusText}`,
        detail: errText.slice(0, 500),
        status: res.status,
      });
    }

    const data = await res.json();
    console.log('[attack] Gemini response received, candidates:', data.candidates?.length || 0);

    if (!data.candidates || data.candidates.length === 0) {
      console.error('[attack] No candidates in response:', JSON.stringify(data).slice(0, 500));
      return makeErrorResponse(
        {
          damage: 5,
          bossDamage: profile.bossDamageRange[0],
          response: "I... I can't even parse what you just said. Consider me mildly annoyed.",
          category: "other",
          combo: false,
          lore: shouldDropLore ? LORE_FRAGMENTS[Math.floor(Math.random() * LORE_FRAGMENTS.length)] : null,
          challenge: null,
          weakness: null,
          bossAttackName: "Confusion Blast",
        },
        {
          error: 'Gemini returned no candidates',
          detail: JSON.stringify(data).slice(0, 500),
        }
      );
    }

    const raw = data.candidates[0]?.content?.parts?.[0]?.text?.trim() || '';
    console.log('[attack] Raw Gemini text:', raw.slice(0, 300));

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[attack] Could not extract JSON from Gemini response:', raw.slice(0, 300));
      return makeErrorResponse(
        {
          damage: 5,
          bossDamage: profile.bossDamageRange[0],
          response: "I... I can't even parse what you just said. Consider me mildly annoyed.",
          category: "other",
          combo: false,
          lore: shouldDropLore ? LORE_FRAGMENTS[Math.floor(Math.random() * LORE_FRAGMENTS.length)] : null,
          challenge: null,
          weakness: null,
          bossAttackName: "Confusion Blast",
        },
        {
          error: 'Could not parse JSON from Gemini response',
          rawText: raw.slice(0, 300),
        }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (jsonErr) {
      console.error('[attack] JSON.parse failed on extracted match:', jsonErr.message, jsonMatch[0].slice(0, 300));
      return makeErrorResponse(
        {
          damage: 5,
          bossDamage: profile.bossDamageRange[0],
          response: "Your words scrambled my circuits. Try again.",
          category: "other",
          combo: false,
          lore: null,
          challenge: null,
          weakness: null,
          bossAttackName: "Confusion Blast",
        },
        {
          error: 'JSON.parse failed on Gemini output',
          detail: jsonErr.message,
          rawText: jsonMatch[0].slice(0, 300),
        }
      );
    }

    const damage = Math.min(profile.damageRange[1], Math.max(0, Math.round(Number(parsed.damage) || 0)));
    const bossDamage = Math.min(profile.bossDamageRange[1], Math.max(profile.bossDamageRange[0], Math.round(Number(parsed.bossDamage) || profile.bossDamageRange[0])));
    const response = String(parsed.response || '...').slice(0, 300);
    const category = ['wit', 'roast', 'flattery', 'philosophy', 'chaos', 'other'].includes(parsed.category) ? parsed.category : 'other';
    const combo = Boolean(parsed.combo);
    const lore = parsed.lore ? String(parsed.lore).slice(0, 200) : null;
    const challenge = parsed.challenge ? String(parsed.challenge).slice(0, 250) : null;
    const weakness = parsed.weakness ? String(parsed.weakness).slice(0, 150) : null;
    const bossAttackName = String(parsed.bossAttackName || 'Dark Word').slice(0, 50);

    return makeSuccessResponse({ damage, bossDamage, response, category, combo, lore, challenge, weakness, bossAttackName });
  } catch (err) {
    console.error('[attack] Unexpected error processing Gemini response:', err.message, err.stack);
    return makeErrorResponse(RATE_LIMIT_FALLBACK, {
      error: 'Unexpected error processing response',
      detail: err.message,
      stack: err.stack?.slice(0, 300),
    });
  }
};
