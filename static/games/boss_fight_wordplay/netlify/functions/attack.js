const RATE_LIMIT_FALLBACK = {
  damage: 0,
  response: "The Boss is gathering immense power. You must wait a minute before attacking again.",
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
    };
  }

  let userInput;
  try {
    const body = JSON.parse(event.body);
    userInput = (body.input || '').slice(0, 300);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const systemPrompt = `You are an arrogant 8-bit video game boss. The player attacks you by saying: '${userInput}'. Decide how emotionally or physically damaging this is on a scale of 0 to 25. Return ONLY a valid JSON object in this exact format: {"damage": number, "response": "A short, in-character reaction to what they said."}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userInput }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.9,
          maxOutputTokens: 150,
        },
      }),
    });

    if (res.status === 429) {
      console.warn('Gemini 429 rate limit hit');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(RATE_LIMIT_FALLBACK),
      };
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API error:', res.status, errText);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(RATE_LIMIT_FALLBACK),
      };
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ damage: 5, response: "I... couldn't process that. But you still annoy me." }),
      };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const damage = Math.min(25, Math.max(0, Math.round(Number(parsed.damage) || 0)));
    const response = String(parsed.response || '...').slice(0, 200);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ damage, response }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(RATE_LIMIT_FALLBACK),
    };
  }
};
