import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import PatientForm from "./PatientForm";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const userId = user.id;

  const profileInfo = await db.user.findUnique({
    where: {
      userId
    },
  });

  if(!profileInfo) {
    notFound()
  }
  


  const firstName = profileInfo.firstName || "";
  const lastName = profileInfo.lastName || "";
  const email = profileInfo.email || "";

  const fullName = `${firstName} ${lastName}`.trim();

  return <PatientForm fullName={fullName} email={email} />;
};

export default Page;
