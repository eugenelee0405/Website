import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert Tech Consultant. Return 3 top product recommendations based on the user's budget and needs.

Return valid JSON only. Do not include markdown code fences. Do not include extra keys or explanatory text.

The JSON response must exactly match this shape:
{
  "recommendations": [
    { "name": "string", "estimatedPrice": "string", "whyItFits": "string" },
    { "name": "string", "estimatedPrice": "string", "whyItFits": "string" },
    { "name": "string", "estimatedPrice": "string", "whyItFits": "string" }
  ]
}

Rules:
- Provide exactly 3 recommendations.
- Keep each "whyItFits" to one sentence.
- Keep price estimates realistic and concise.`;

export async function POST(req: Request) {
  console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as { messages?: UIMessage[] };

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    const modelMessages = await convertToModelMessages(body.messages);

    const result = streamText({
      model: openai(process.env.OPENAI_MODEL ?? 'gpt-4.1-mini'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('OPENAI ERROR:', error);
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
