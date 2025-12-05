// components/GPTDevAgentPanel.tsx
'use client';
import React, { useState } from 'react';

export default function GPTDevAgentPanel() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [improvedCode, setImprovedCode] = useState('');
  const [status, setStatus] = useState('');

  const generate = async () => {
    const res = await fetch('/api/gpt/build-component', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setCode(data.code);
    setStatus('✅ Component generated');
  };

  const improve = async () => {
    const res = await fetch('/api/gpt/improve', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setImprovedCode(data.improvedCode);
    setStatus('🛠 Improved version ready');
  };

  const applyImprovement = () => {
    if (improvedCode) {
      setCode(improvedCode);
      setImprovedCode('');
      setStatus('✅ Improvement applied');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">🧠 GPT Dev Agent</h2>
      <textarea className="w-full border p-2" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your component..." />
      <button onClick={generate} className="bg-blue-600 text-white px-4 py-2">Generate</button>

      {code && (
        <>
          <h3 className="font-semibold">🧩 Generated Code:</h3>
          <pre className="bg-gray-100 p-3 text-sm whitespace-pre-wrap">{code}</pre>
          <button onClick={improve} className="bg-yellow-500 text-white px-4 py-2">Critique / Improve</button>
        </>
      )}

      {improvedCode && (
        <>
          <h3 className="font-semibold">✨ Suggested Improvement:</h3>
          <pre className="bg-green-100 p-3 text-sm whitespace-pre-wrap">{improvedCode}</pre>
          <button onClick={applyImprovement} className="bg-green-600 text-white px-4 py-2">Apply Improvement</button>
        </>
      )}

      {status && <div className="text-sm text-gray-700">{status}</div>}
    </div>
  );
}
