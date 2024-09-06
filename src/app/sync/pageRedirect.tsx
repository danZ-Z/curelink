"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageRedirectProps {
  isFilledUp: boolean;
}

const PageRedirect = ({ isFilledUp }: PageRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isFilledUp) {
      router.push("pages/patient-form");
    } else {
      router.push("pages/appointment-form");
    }
  }, [isFilledUp, router]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-80 w-80 border-t-8 border-teal-600 border-solid"></div>
    </div>
  );
};

export default PageRedirect;
