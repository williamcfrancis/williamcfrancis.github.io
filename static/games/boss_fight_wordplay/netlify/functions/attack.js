exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OPENAI_API_KEY not configured' }),
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

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        max_tokens: 150,
        temperature: 0.9,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI API error:', errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Upstream API error' }),
      };
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '';

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
    const response = String(parsed.response || "...").slice(0, 200);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ damage, response }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
