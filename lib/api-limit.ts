import { auth } from "@clerk/nextjs";

import prismaDb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/public/constants";

export const increaseApiCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const userApiRec = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiRec) {
    await prismaDb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiRec.count + 1 },
    });
  } else {
    await prismaDb.userApiLimit.create({ data: { userId: userId, count: 1 } });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userApiRec = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiRec || userApiRec.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiUsedCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiRec = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiRec) {
    return 0;
  }

  return userApiRec.count;
};
