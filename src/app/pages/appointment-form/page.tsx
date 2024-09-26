import React from "react";
import AppointmentForm from "./AppointmentForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { db } from "@/db";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const userId = user.id;

  const userConfig = await db.appointment.findMany({
    where: {
      userId: userId,
    },
  });

  if (!userConfig) {
    await db.appointment.create({
      data: {
        userId: userId,
      },
    });
  }

  const profile = await db.user.findUnique({
    where: {
      userId,
    },
  });

  const firstName = profile?.firstName;
  const lastName = profile?.lastName;

  const fullName = `${firstName} ${lastName}`;

  const medicianName = profile?.primaryDoctor || "";

  return <AppointmentForm fullName={fullName} medicianName={medicianName} userId={userId} />;
};

export default Page;
