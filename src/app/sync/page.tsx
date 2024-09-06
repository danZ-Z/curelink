import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PageRedirect from "./pageRedirect";
import { notFound } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const userId = user.id;

  const profileInfo = await db.user.findUnique({
    where: {
      userId,
    },
  });

  if (!profileInfo) {
    return notFound();
  }

  const isFilledUp = profileInfo?.isFilledUp ?? false;

  return <PageRedirect isFilledUp={isFilledUp} />;
};

export default Page;
