import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const BRAND_VOICE_GUIDANCE: Record<string, string> = {
  streetwear:
    "Bold, urban, hype-driven tone. Use confident, culture-forward language that resonates with streetwear audiences.",
  luxury:
    "Refined, exclusive, aspirational tone. Emphasize craftsmanship, quality, and elevated lifestyle appeal.",
  minimalist:
    "Clean, understated, essential tone. Keep copy concise and focused on form, function, and simplicity.",
  playful:
    "Fun, witty, conversational tone. Be approachable and energetic without sounding unprofessional.",
  eco: "Sustainable, ethical, natural tone. Highlight environmental responsibility and conscious materials.",
  technical:
    "Precise, spec-focused, expert tone. Lead with features, materials, and performance details clearly.",
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { brandVoice, brandVoiceLabel, productDetails } = body as {
      brandVoice?: string;
      brandVoiceLabel?: string;
      productDetails?: string;
    };

    if (!productDetails?.trim()) {
      return NextResponse.json(
        { error: "Product details are required." },
        { status: 400 }
      );
    }

    const voiceKey = brandVoice ?? "luxury";
    const voiceLabel = brandVoiceLabel ?? "Luxury";
    const voiceGuidance =
      BRAND_VOICE_GUIDANCE[voiceKey] ?? BRAND_VOICE_GUIDANCE.luxury;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: `You are VibeWrite, an expert Shopify product copywriter. Write a single professional product description ready to paste into a Shopify product page.

Brand voice: ${voiceLabel}
Style guidance: ${voiceGuidance}

Rules:
- Write 2–4 short paragraphs (roughly 80–150 words total)
- Match the brand voice consistently
- Use only facts from the product details provided; do not invent specs
- No markdown, bullet lists, or headings — plain prose only
- End with a subtle call-to-action appropriate for e-commerce`,
    });

    const result = await model.generateContent(
      `Product details:\n\n${productDetails.trim()}`
    );

    const description = result.response.text()?.trim();

    if (!description) {
      return NextResponse.json(
        { error: "No description was generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Generate API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate description.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
