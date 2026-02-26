const { MODEL_PRIORITY, generateWithModelFallback } = require('../../../../../netlify/functions/llm');

const SYSTEM_PROMPT = `You are the physics engine for a cozy but competitive 3D twin-stick shooter called Botanical Brawl. The player has requested a new weapon. Convert their description into game parameters. Be creative — match the vibe of the description to the stats. Heavy or slow-sounding weapons should have high damage but low speed. Zippy or rapid-fire weapons should have high speed but lower damage. Bouncy or ricocheting descriptions should have high bounces. Large or oversized items should have high scale.

Respond ONLY with these exact flags using angular brackets:
<speed: [float 0.1 to 5.0]> <damage: [int 10 to 500]> <scale: [float 0.5 to 5.0]> <bounces: [int 0 to 5]> <audio_freq: [int 200 to 1200]> <audio_type: [sine or triangle]>

Do not include any other text.`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
    };
  }

  let prompt;
  try {
    const body = JSON.parse(event.body);
    prompt = (body.prompt || '').slice(0, 300);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!prompt) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing prompt' }) };
  }

  try {
    const { data, model } = await generateWithModelFallback({
      apiKey,
      attemptsPerModel: 1,
      requestBodyFactory: () => ({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: `The player requested: "${prompt}"` }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 120,
        },
      }),
    });

    console.log('[forge] Success model:', model);
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    const details = Array.isArray(err?.details) ? err.details : [];
    console.error('[forge] All model attempts failed:', JSON.stringify(details));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error', modelsTried: MODEL_PRIORITY }),
    };
  }
};
