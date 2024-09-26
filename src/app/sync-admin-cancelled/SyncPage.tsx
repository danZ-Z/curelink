import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface SyncPageProps {
  appointmentId: string;
}

const SyncPage = async ({ appointmentId }: SyncPageProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  // Update the appointment status in the database
  if (appointmentId) {
    await db.appointment.update({
      where: { id: appointmentId },
      data: {
        cancelled: true,
        scheduled: false,
        pending: false,
      },
    });

    // After updating, redirect to the admin page
    redirect("/pages/admin");
  } else {
    return notFound(); // Handle case where appointmentId is not provided
  }
};

export default SyncPage;
