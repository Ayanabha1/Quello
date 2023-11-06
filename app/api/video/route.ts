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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );
    await increaseApiCount();
    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
