"use client"
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"; // Adjust the import based on your setup

interface ScheduledProps {
  appointmentId:string;
}

const Scheduled = ({ appointmentId }: ScheduledProps) => {
  return (
    <Link
      href={`/sync-admin-scheduled?appointmentId=${appointmentId}`} // Pass the appointmentId to the sync page
      className={buttonVariants({
        size: "lg",
        variant: "default",
        className:
          "py-1 w-28 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
      })}
    >
      Schedule
    </Link>
  );
};

export default Scheduled;
