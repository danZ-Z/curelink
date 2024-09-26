"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { notFound, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig, SaveConfigArgs } from "./actions";
import Link from "next/link";

const FormSchema = z.object({
  medicianName: z.string().min(2, {
    message: "Medician must be at least 2 characters.",
  }),
  reason: z.string().min(2, {
    message: "Please, write your reason for appointment",
  }),
  comments: z.string().min(0),
  appointmentDate: z.date({
    required_error: "A valid appointment date is required",
  }),
});

interface AppointmentFormProps {
  fullName: string;
  medicianName: string;
  userId: string;
}

const AppointmentForm = ({
  fullName,
  medicianName,
  userId,
}: AppointmentFormProps) => {
  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([_saveConfig(args)]);
    },
    onError: (error) => {
      console.error("Error saving configuration:", error);
      notFound();
    },
    onSuccess: () => {
      router.push(`/pages/thank-you`);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      medicianName: medicianName,
      reason: "",
      comments: "",
      appointmentDate: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveConfig({
      userId: userId,
      doctor: data.medicianName,
      reason: data.reason,
      comments: data.comments,
      appointmentDate: data.appointmentDate,
    });
  }
  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex flex-col gap-2 pb-5">
        <div className="flex flex-row items-center justify-between">
          <Image src="/CarePulseLogo.png" alt="Logo" width={80} height={80} />
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
        <h1 className="font-semibold text-4xl">Hey {fullName}👋</h1>
        <p className="text-md text-zinc-500">
          Request a new appointment in 10 seconds
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="medicianName"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex flex-col gap-5 ">
                  <FormLabel>Doctor</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white"
                      autoComplete="off"
                      placeholder={fullName}
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-5">
            {/* Reason for appointment */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex flex-col gap-5">
                    <FormLabel>Reason for appointment</FormLabel>
                    <FormControl>
                      <Input
                        className="h-20 pb-10"
                        autoComplete="off"
                        placeholder="Monthly check-up"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Additional comments */}
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex flex-col gap-5">
                    <FormLabel>Additional comments/notes</FormLabel>
                    <FormControl>
                      <Input
                        className="h-20 pb-10"
                        autoComplete="off"
                        placeholder="Prefer afternoon appointments, if possible"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Appointment date */}
          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Appointment date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal active:ring-2 active:ring-teal-700 text-white hover:text-white bg-zinc-900 hover:bg-zinc-800",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-zinc-500">Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                      className="bg-zinc-900 text-white "
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-8 text-lg tracking-wide font-semibold bg-teal-700 border border-teal-800 hover:bg-teal-600"
          >
            Submit
          </Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default AppointmentForm;
