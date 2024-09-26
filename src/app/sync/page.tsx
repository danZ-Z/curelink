import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PageRedirect from "./pageRedirect";
import { notFound } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if (!user) {
  //   return notFound();
  // }

  const userId = user.id;

  const profileInfo = await db.user.findUnique({
    where: {
      userId,
    },
  });

  const existingListId = "someListId";

  const userList = await db.userList.findUnique({
    where: { id: existingListId },
  });

  if (userList) {
    if (!userList.userId.includes(userId)) {
      await db.userList.update({
        where: { id: existingListId },
        data: {
          userId: {
            set: [...userList.userId, userId], // Append only if userId is not already present
          },
        },
      });
    }
  } else {
    await db.userList.create({
      data: {
        id: existingListId,
        userId: [userId],
      },
    });
  }

  if (!profileInfo) {
    return notFound();
  }

  const isFilledUp = profileInfo?.isFilledUp ?? false;

  return <PageRedirect isFilledUp={isFilledUp} />;
};

export default Page;
