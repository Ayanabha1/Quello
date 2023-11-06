import { auth } from "@clerk/nextjs";
import prismaDb from "./prismadb";

const DAY_IN_MS = 86_400_400;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSub = await prismaDb.userSubsciption.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSub) {
    return false;
  }

  const isValid =
    userSub.stripePriceId &&
    userSub.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
