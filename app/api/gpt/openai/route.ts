import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 500 });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });
  const data = await response.json();
  const message = data.choices?.[0]?.message?.content || 'No response';
  return NextResponse.json({ result: message });
}
