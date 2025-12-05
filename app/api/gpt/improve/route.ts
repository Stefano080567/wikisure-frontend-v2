import { NextResponse } from 'next/server';

export async function POST(req) {
  const { code } = await req.json();
  const improvedCode = code.replace('<div>', '<section>').replace('</div>', '</section>'); // dummy improvement
  return NextResponse.json({ improvedCode });
}
