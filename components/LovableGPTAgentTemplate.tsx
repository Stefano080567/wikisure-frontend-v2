'use client';
import React from 'react';
import GPTDevAgentPanel from './GPTDevAgentPanel';

export default function LovableGPTAgentTemplate() {
  return (
    <div className="bible-px bible-py max-w-4xl mx-auto bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-[#0061FF]">🌐 GPT Dev Agent – Semantic Builder</h1>
      <GPTDevAgentPanel />
    </div>
  );
}
