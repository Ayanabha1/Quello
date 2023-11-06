import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error ${error?.message} `, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await prismaDb.userSubsciption.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: sub.id,
        stripeCustomerId: sub.customer as string,
        stripePriceId: sub.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await prismaDb.userSubsciption.update({
      where: {
        stripeCustomerId: sub.id,
      },
      data: {
        stripePriceId: sub.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
      },
    });
  }
  return new NextResponse(null, { status: 200 });
}
