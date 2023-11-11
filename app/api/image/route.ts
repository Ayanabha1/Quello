import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "256x256", clientApiKey } = body;

    const config = new Configuration({
      apiKey: clientApiKey,
    });
    const openai = new OpenAIApi(config);

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resulution is required required", {
        status: 400,
      });
    }

    const freeTrial = await checkApiLimit();
    const isPremium = await checkSubscription();

    if (!freeTrial && !isPremium) {
      return new NextResponse("Free trial has been expired", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiCount();

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE ERROR]", error);
    return new NextResponse("[OPENAI ERROR] please check your OPENAI Api Key", {
      status: 500,
    });
  }
}
