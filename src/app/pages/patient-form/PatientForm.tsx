"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  birthDate: z.date({
    required_error: "A valid birth date is required.",
  }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a valid gender." }),
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  occupation: z.string().min(2, {
    message: "Occupation must be at least 2 characters.",
  }),
  emergencyContactName: z.string().min(2, {
    message: "Emergency contact name must be at least 2 characters.",
  }),
  emergencyContactPhone: z.string().min(10, {
    message: "Emergency contact phone must be at least 10 digits.",
  }),
  medicianName: z.enum(
    ["Dr. Sarah Safari", "Dr. Ava Williams", "Dr. Adam Smith"],
    {
      errorMap: () => ({ message: "Choose your medician" }),
    }
  ),
  insuranceProvider: z.string().min(2, {
    message: "Insurance provider name must be at least 2 characters",
  }),
  insurancePolicyNumber: z.string().min(5, {
    message: "Insurance policy number name must be at least 5 characters",
  }),
  allergies: z.string().min(0),
  currentMedications: z.string().min(0),
  familyMedicalHistory: z.string().min(0),
  pastMedicalHistory: z.string().min(0),
  identificationType: z.enum(["ID", "Driving licence"], {
    errorMap: () => ({ message: "Choose your identification type" }),
  }),
});

interface PatientFormProps {
  fullName: string;
  email: string;
}

export function SampleDatePicker() {
  const [date, setDate] = useState<Date>();
}

const PatientForm = ({ fullName, email }: PatientFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: fullName || "",
      email: email || "",
      phoneNumber: "",
      birthDate: new Date(),
      gender: "male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicianName: "Dr. Adam Smith",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedications: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "ID",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}
  const currentYear = new Date().getFullYear();
  return (
    <MaxWidthWrapper className="py-10">
      <div className="flex flex-col gap-2 pb-5">
        <Image src="/CarePulseLogo.png" alt="Logo" width={80} height={80} />
        <h1 className="font-semibold text-4xl">Welcome👋</h1>
        <p className="text-md text-zinc-500">Let us now more about yourself</p>
        <h2 className="font-semibold text-3xl mt-10">Personal information</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName" // Replace with the correct field name
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex flex-col gap-5 ">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-zinc-500"
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
            {/* Email */}
            <FormField
              control={form.control}
              name="email" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex flex-col gap-5 text-zinc-500">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={email}
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex flex-col gap-5">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="+421 000 000 000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {/* Birth Date */}
            <FormField
              control={form.control}
              name="birthDate" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Birth date</FormLabel>
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

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="r3" />
                        <Label htmlFor="r3">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Address */}
            <FormField
              control={form.control}
              name="address" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="14 street, New York, NY - 5101"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Software engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Emergency Contact Name */}
            <FormField
              control={form.control}
              name="emergencyContactName" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Emergency contact name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Guardian's name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Emergency Contact Phone */}
            <FormField
              control={form.control}
              name="emergencyContactPhone" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Emergency phone number</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="+421 234 567 890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="font-semibold text-3xl pt-10">Medical information</h2>

          {/* Medician Name */}
          <FormField
            control={form.control}
            name="medicianName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary care Medician</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select your medician"
                        className=""
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Safari">
                      Dr. Sarah Safari
                    </SelectItem>
                    <SelectItem value="Dr. Ava Williams">
                      Dr. Ava Williams
                    </SelectItem>
                    <SelectItem value="Dr. Adam Smith">
                      Dr. Adam Smith
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-5">
            {/* Insurance provider */}
            <FormField
              control={form.control}
              name="insuranceProvider" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Insurance provider</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="BlueCross"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Insurance policy number */}
            <FormField
              control={form.control}
              name="insurancePolicyNumber" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Insurance policy number</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="ABC24578C45"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Allergies */}
            <FormField
              control={form.control}
              name="allergies" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Allergies (if any)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-20 pb-10"
                      autoComplete="off"
                      placeholder="Peanuts, milk"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current medications */}
            <FormField
              control={form.control}
              name="currentMedications" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Medications (if any)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-20 pb-10"
                      autoComplete="off"
                      placeholder="Ibuprofren 200mg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Family medical history */}
            <FormField
              control={form.control}
              name="familyMedicalHistory" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Family medical history (if relevant)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-20 pb-10"
                      autoComplete="off"
                      placeholder="Mother had breast cancer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Past medical history */}
            <FormField
              control={form.control}
              name="pastMedicalHistory" // Replace with the correct field name
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Past medical history (if relevant)</FormLabel>
                  <FormControl>
                    <Input
                      className="h-20 pb-10"
                      autoComplete="off"
                      placeholder="Asthma diagnosis in childhood"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="font-semibold text-3xl pt-10">
            Identification and Verification
          </h2>

          {/* Identification type */}
          <FormField
            control={form.control}
            name="identificationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identification Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ID">ID</SelectItem>
                    <SelectItem value="Driving licence">
                      Driving licence
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Identification number */}
          <FormField
            control={form.control}
            name="pastMedicalHistory" // Replace with the correct field name
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Identification number</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="123456789"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default PatientForm;
