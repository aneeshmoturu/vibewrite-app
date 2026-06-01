"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateProductCopy(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { error: "You must be logged in." };

  const productName = formData.get("productName") as string;
  const keywords = formData.get("keywords") as string;
  const tone = formData.get("tone") as string;

  if (!productName || !keywords) return { error: "Please fill out all fields." };

  const user = await prisma.user.findUnique({ where: { userId } });
  if (!user || user.credits <= 0) return { error: "Not enough credits. Please upgrade!" };

  try {
    // Construct the prompt for the AI
    const prompt = `You are a world-class e-commerce copywriter. Write a highly engaging product description for a product named "${productName}". 
    The tone of voice must be: ${tone}. 
    You must seamlessly include the following key features: ${keywords}. 
    Make it punchy, persuasive, and ready to publish on a website. Keep it strictly under 3 paragraphs.`;

    // Call the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });    const aiResponse = await model.generateContent(prompt);
    const generatedCopy = aiResponse.response.text();

    // Deduct 1 credit
    await prisma.user.update({
      where: { userId },
      data: { credits: user.credits - 1 },
    });

    revalidatePath("/dashboard");

    // Send the real AI text back to the screen
    return { success: true, data: generatedCopy };

  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "The AI engine failed to generate copy. Please try again." };
  }
}