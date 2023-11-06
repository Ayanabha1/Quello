import { checkApiLimit, increaseApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import Replicate from "replicate";

const replicateAi = new Replicate({
  auth: process.env.REPLICATE_AI_SECRET_KEY,
});
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPremium = await checkSubscription();

    if (!freeTrial && !isPremium) {
      return new NextResponse("Free trial has been expired", { status: 403 });
    }

    const response = await replicateAi.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    await increaseApiCount();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
