"use server";

import { db } from "@/db";
import { Gender } from "@prisma/client";

export type SaveConfigArgs = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  primaryDoctor: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  alergies: string;
  currentMedications: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  scannedPhotoUrl: string;
  isFilledUp: boolean;
};

export async function saveConfig({
  userId,
  email,
  firstName,
  lastName,
  phoneNumber,
  dateOfBirth,
  gender,
  address,
  occupation,
  emergencyContactName,
  emergencyContactPhoneNumber,
  primaryDoctor,
  insuranceProvider,
  insurancePolicyNumber,
  alergies,
  currentMedications,
  familyMedicalHistory,
  pastMedicalHistory,
  identificationType,
  identificationNumber,
  scannedPhotoUrl,
  isFilledUp,
}: SaveConfigArgs) {
  await db.user.update({
    where: { userId: userId },
    data: {
      email,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      occupation,
      emergencyContactName,
      emergencyContactPhoneNumber,
      primaryDoctor,
      insuranceProvider,
      insurancePolicyNumber,
      alergies,
      currentMedications,
      familyMedicalHistory,
      pastMedicalHistory,
      identificationType,
      identificationNumber,
      scannedPhotoUrl,
      isFilledUp,
    },
  });
}
