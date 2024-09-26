import Cancelled from "@/components/Cancelled";
import Scheduled from "@/components/Scheduled";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { format } from "date-fns";
import { Check, CheckCheck, Hourglass, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { scheduler } from "timers/promises";

interface AppointmentInfo {
  id: string;
  userId: string;
  userName: string;
  appointmentDate: string;
  doctor: string;
  pending: boolean;
  scheduled: boolean;
  cancelled: boolean;
}

const Page = async () => {
  let appointments: AppointmentInfo[] = [];

  const userList = await db.userList.findUnique({
    where: {
      id: "someListId",
    },
  });

  if (userList) {
    const userInfoPromises = userList.userId.map(async (userId) => {
      const user = await db.user.findUnique({
        where: {
          userId: userId,
        },
      });

      const appointment = await db.appointment.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return appointment.map((appointment) => ({
        id: appointment?.id,
        userId,
        userName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        appointmentDate: appointment?.appointmentDate
          ? format(new Date(appointment.appointmentDate), "MMM d, yyyy")
          : "No appointment",
        doctor: appointment?.doctor || "No doctor assigned",
        pending: appointment?.pending ?? true,
        scheduled: appointment?.scheduled ?? false,
        cancelled: appointment?.cancelled ?? false,
      }));
    });

    const userAppointments = await Promise.all(userInfoPromises);

    appointments = userAppointments.flat();
  }

  return (
    <div className="flex flex-col mx-10 py-3">
      <div className="flex flex-row justify-between items-center mt-7 py-3 px-8 rounded-2xl bg-stone-950">
        <Image src="/CarePulseLogo.png" alt="Logo" width={80} height={80} />
        <p className="text-2xl font-semibold">Admin</p>
        <Link
          href="/"
          className={buttonVariants({
            size: "sm",
            variant: "default",
            className:
              "py-2 w-16 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
          })}
        >
          Home
        </Link>
      </div>

      <div className="mx-20 mt-10">
        <h2 className="text-5xl font-semibold">Welcome, Admin</h2>
        <p className="text-zinc-400 mt-4 text-xl">
          Start day with managing new appointments
        </p>
      </div>

      <div className="flex flex-row items-center w-full justify-between rounded-t-lg p-2 pb-4 mt-6 border border-zinc-500 bg-zinc-950">
        <p className="text-lg font-medium w-80">Name:</p>
        <p className="text-md w-80">Appointment Date:</p>
        <p className="text-md w-80">Status:</p>
        <p className="text-md w-80">Doctor: </p>
        <p className="text-md w-80">Actions: </p>
      </div>

      <div className="border border-t-0 border-zinc-700 rounded-b-lg">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className={`flex flex-row items-center w-full justify-between p-2 pb-4 rounded-lg ${
                index % 2 === 0 ? "bg-neutral-950" : "bg-neutral-900"
              }`}
            >
              <p className="text-lg font-medium w-40">{appointment.userName}</p>
              <p className="text-md w-40">{appointment.appointmentDate}</p>
              <p className="text-md w-40">
                {appointment.pending ? (
                  <>
                    <span className="bg-blue-500 text-blue-900 text-center rounded-md py-2 font-semibold w-32 flex gap-2 px-2 shadow-md shadow-blue-500">
                      <Hourglass className="size-6" />
                      Pending
                    </span>
                  </>
                ) : appointment.scheduled ? (
                  <>
                    <span className="bg-teal-500 text-teal-900 text-center rounded-md py-2 font-semibold w-32 flex gap-2 px-2 shadow-md shadow-teal-500">
                      <CheckCheck className="size-6" />
                      Scheduled
                    </span>
                  </>
                ) : appointment.cancelled ? (
                  <span className="bg-red-500 text-red-900 text-center rounded-md py-2 font-semibold w-32 flex gap-2 px-2 shadow-md shadow-red-500">
                    <X className="size-6" />
                    Cancelled
                  </span>
                ) : (
                  <p>Non existing reservation</p>
                )}
              </p>
              <p className="text-md w-40">{appointment.doctor}</p>
              <Scheduled appointmentId={appointment.id} />
              <Cancelled appointmentId={appointment.id} />
            </div>
          ))
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
