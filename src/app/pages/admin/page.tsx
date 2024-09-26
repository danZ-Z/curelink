import TestS from "@/components/TestS";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface AppointmentInfo {
  userId: string;
  userName: string;
  appointmentDate: string;
  doctor: string;
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
        userId,
        userName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        appointmentDate: appointment?.appointmentDate
          ? format(new Date(appointment.appointmentDate), "MMM d, yyyy")
          : "No appointment",
        doctor: appointment?.doctor || "No doctor assigned",
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
        <TestS/>
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
        <p className="text-md w-80">Doctor: </p>
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
              <p className="text-lg font-medium w-80">{appointment.userName}</p>
              <p className="text-md w-80">{appointment.appointmentDate}</p>
              <p className="text-md w-80">{appointment.doctor}</p>
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
