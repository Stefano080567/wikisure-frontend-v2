// scripts/test-agent.ts
async function testAgent() {
  const payload = {
    prompt: "A button that logs 'Hello World' on click",
  };

  const gptRes = await fetch('http://localhost:3000/api/gpt/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const { result } = await gptRes.json();
  console.log('🔹 GPT Result:', result);

  const notionRes = await fetch('http://localhost:3000/api/notion/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      term: 'Test Button',
      code: result,
      tags: ['test', 'auto']
    })
  });
  console.log('✅ Notion Save:', await notionRes.json());

  const supaRes = await fetch('http://localhost:3000/api/supabase/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      term: 'Test Button',
      code: result
    })
  });
  console.log('🗂 Supabase Log:', await supaRes.json());
}

testAgent().catch(console.error);
