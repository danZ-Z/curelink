import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

interface SyncPageProps {
  appointmentId: string;
}

const SyncPage = async ({ appointmentId }: SyncPageProps) => {
  // Ensure this component runs server-side by marking it as async

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound(); // If no user is found, throw a 404 error
  }

  // Proceed with appointment update if appointmentId is present
  if (appointmentId) {
    try {
      // Update the appointment in the database
      await db.appointment.update({
        where: { id: appointmentId },
        data: {
          scheduled: true,
          pending: false,
          cancelled: false,
        },
      });

      // Redirect to the admin page after successful update
      redirect('/pages/admin');
    } catch (error) {
      console.error('Error updating appointment:', error);
      return notFound(); // Handle errors by showing a 404 page
    }
  } else {
    return notFound(); // Handle the case where appointmentId is not provided
  }
};

export default SyncPage;
