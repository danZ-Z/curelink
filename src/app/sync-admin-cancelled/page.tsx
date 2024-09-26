"use client"
import { notFound, useSearchParams } from "next/navigation";
import SyncPage from "./SyncPage";

const Page = () => {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  if (!appointmentId) {
    return notFound();
  }

  return <SyncPage appointmentId={appointmentId} />;
};

export default Page;
