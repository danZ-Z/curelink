import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Calendar, CircleCheck } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface ThankYouProps {
  doctor: string;
  appointmentDate: Date;
}

const ThankYou = ({ doctor, appointmentDate }: ThankYouProps) => {
  const formattedDate = format(appointmentDate, "MMMM d, yyyy");
  return (
    <MaxWidthWrapper className="flex justify-center pt-10">
      <div className="flex flex-col">
        <Image
          src="/CarePulseLogo.png"
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto pb-20"
        />
        <CircleCheck className="size-20 text-teal-500 bg-gradient-radial from-teal-950 to-zinc-900 mx-auto" />
        <div className="text-3xl font-semibold text-center mx-auto pt-5">
          Your <span className="text-teal-500">appointment request</span> has
          been successfully submitted!
        </div>
        <p className="text-md text-zinc-500 text-center pt-5 pb-5">
          We&apos;ll be in touch shortly to confirm
        </p>
        <div className="flex flex-col md:flex-row border-t border-b border-zinc-700 py-10 items-center gap-10 text-2xl text-zinc-400 px-10 text-center">
          <p>Requested appointment details:</p>
          <p className="border p-2 rounded-sm text-white bg-zinc-950">
            {doctor}
          </p>
          <p className="flex flex-row items-center gap-2">
            <Calendar /> {formattedDate}
          </p>
        </div>
        <Link
          href="/"
          className={buttonVariants({
            size: "lg",
            variant: "default",
            className:
              "py-2 w-20 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900 mx-auto my-5",
          })}
        >
          Home
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default ThankYou;
