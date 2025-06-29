import { NextRequest, NextResponse } from "next/server";
import { ChatMessage } from "@/lib/definitions";

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";

export async function POST(req: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const { messages } = (await req.json()) as { messages: ChatMessage };
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages must be an array" },
        { status: 400 }
      );
    }

    const fullMessages = [
      {
        role: "system",
        content:
          "Answer the user in exactly one concise paragraph (no bullet points, no line breaks).",
      },
      ...messages,
    ];

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ model: MODEL, messages: fullMessages }),
      }
    );

    if (!openaiRes.ok) {
      console.error("OpenAI error", await openaiRes.text());
      return NextResponse.json({ error: "OpenAI error" }, { status: 502 });
    }

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? "(no response)";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("/api/chat error", err);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
