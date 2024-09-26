"use client"
import React from 'react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"; // Adjust the import based on your setup

interface CancelledProps {
  appointmentId:string;
}

const Cancelled = ({ appointmentId }: CancelledProps) => {
  return (
    <Link
      href={`/sync-admin-cancelled?appointmentId=${appointmentId}`} // Pass the appointmentId to the sync page
      className={buttonVariants({
        size: "lg",
        variant: "default",
        className:
          "py-1 w-20 bg-red-700 hover:bg-red-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
      })}
    >
      Cancel
    </Link>
  );
};

export default Cancelled;
