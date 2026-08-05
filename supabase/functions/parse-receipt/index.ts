import Anthropic from 'npm:@anthropic-ai/sdk@0.37.0';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { image_url } = await req.json();
    if (!image_url) throw new Error('image_url required');

    const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY')! });

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'url', url: image_url } },
          {
            type: 'text',
            text: `This is a car service receipt. Extract info and return ONLY valid JSON — no markdown, no explanation:
{
  "done_at_km": <odometer/mileage as integer, or null>,
  "done_at_date": <"YYYY-MM-DD", or null>,
  "cost_egp": <total amount as number, or null>,
  "notes": <one-line summary of what was done, max 80 chars, or null>
}`,
          },
        ],
      }],
    });

    const raw = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '{}';
    const parsed = JSON.parse(raw);

    return new Response(JSON.stringify(parsed), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
