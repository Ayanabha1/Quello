import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSub = await prismaDb.userSubsciption.findUnique({
      where: {
        userId,
      },
    });

    if (userSub && userSub.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSub.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Quello Premium",
              description: "Unlimited Ai Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
