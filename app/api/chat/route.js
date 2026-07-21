import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.3-70b-versatile',
    });

    const reply = completion.choices[0]?.message?.content || '응답을 가져올 수 없습니다.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'AI 응답 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
