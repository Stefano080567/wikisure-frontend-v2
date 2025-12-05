import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();
  const code = `// React component\nfunction Component() {\n  return <div>${prompt}</div>;\n}`;
  return NextResponse.json({ code });
}
