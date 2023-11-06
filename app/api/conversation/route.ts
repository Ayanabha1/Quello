import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    if (!messages) {
      return new NextResponse("Messages required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPremium = await checkSubscription();

    if (!freeTrial && !isPremium) {
      return new NextResponse("Free trial has been expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiCount();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
