"use server";

import { db } from "@/db";

export type SaveConfigArgs = {
  userId: string;
  doctor: string;
  reason: string;
  comments: string;
  appointmentDate: Date;
  pending: boolean;
  scheduled: boolean;
  cancelled: boolean;
};

export async function saveConfig({
    userId,
    doctor,
    reason,
    comments,
    appointmentDate,
    pending,
    scheduled,
    cancelled,
  }: SaveConfigArgs) {
    await db.appointment.create({
      data: {
        userId,
        doctor,
        reason,
        comments,
        appointmentDate,
        pending,
        scheduled,
        cancelled,
      },
    });
  }
  