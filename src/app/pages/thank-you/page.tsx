import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ThankYou from "./ThankYou";
import { notFound } from "next/navigation";
import { db } from "@/db";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const userId = user.id;

  const profileInfo = await db.appointment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc', 
    },
  });

  if (!profileInfo || profileInfo.length === 0) {
    notFound();
  }

  const firstAppointment = profileInfo[0];

  const doctor = firstAppointment.doctor || "";
  const appointmentDate = firstAppointment.appointmentDate || new Date();

  return <ThankYou doctor={doctor} appointmentDate={appointmentDate} />;
};

export default Page;
