"use client";
import { notFound, useSearchParams } from "next/navigation";
import SyncPage from "./SyncPage";
import { Suspense } from "react";

function Details() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  if (!appointmentId) {
    return notFound();
  }

  return <SyncPage appointmentId={appointmentId} />;
}

const Page = () => {
  return (
    <Suspense>
      <Details />
    </Suspense>
  );
};

export default Page;
