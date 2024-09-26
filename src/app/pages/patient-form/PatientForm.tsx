"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { UploadDropzone } from "@/lib/uploadthing";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { ImageDown, ImageUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { saveConfig as _saveConfig, SaveConfigArgs } from "./actions";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";

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
  gender: z.enum(["Male", "Female", "Other"], {
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
  identificationNumber: z.string().min(6, {
    message: "Indetification number must be at least 6 characters",
  }),
  identificationDocument: z.string().min(0),
});

interface PatientFormProps {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const PatientForm = ({
  firstName,
  lastName,
  email,
  userId,
}: PatientFormProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [scannedPhotoUrl, setScannedPhotoUrl] = useState<string>("");

  const fullName = `${firstName} ${lastName}`;

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
      router.push(`/pages/appointment-form`);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: fullName || "",
      email: email || "",
      phoneNumber: "",
      birthDate: new Date(),
      gender: "Male",
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
      identificationNumber: "",
      identificationDocument: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const [firstName, lastName] = data.fullName.split(" ");
    saveConfig({
      userId,
      email,
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.birthDate,
      gender: data.gender,
      address: data.address,
      occupation: data.occupation,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhoneNumber: data.emergencyContactPhone,
      primaryDoctor: data.medicianName,
      insuranceProvider: data.insuranceProvider,
      insurancePolicyNumber: data.insurancePolicyNumber,
      alergies: data.allergies,
      currentMedications: data.currentMedications,
      familyMedicalHistory: data.familyMedicalHistory,
      pastMedicalHistory: data.pastMedicalHistory,
      identificationType: data.identificationType,
      identificationNumber: data.identificationNumber,
      scannedPhotoUrl: scannedPhotoUrl,
      isFilledUp: true,
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
            name="fullName"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex flex-col gap-5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-zinc-500"
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
              name="phoneNumber"
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
              name="birthDate"
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
              name="gender"
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
              name="address"
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
              name="occupation"
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
              name="emergencyContactName"
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
              name="emergencyContactPhone"
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
              name="insuranceProvider"
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
              name="insurancePolicyNumber"
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
              name="allergies"
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
              name="currentMedications"
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
              name="familyMedicalHistory"
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
              name="pastMedicalHistory"
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
            name="identificationNumber"
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

          {/* Scanned copy of Identification number */}
          <div
            onDragOver={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            <FormField
              control={form.control}
              name="identificationDocument"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Scanned copy of identification document</FormLabel>
                  <FormControl>
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        const identifier = res[0].url;
                        setScannedPhotoUrl(identifier);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                      appearance={{
                        container: `${
                          isDragOver ? "bg-zinc-950" : "bg-zinc-900"
                        } flex flex-col gap-2 min-h-[calc(100vh-26.8rem-1px)] border border-white m-0`,
                        label: "m-0 text-md w-full",
                        allowedContent: "text-sm",
                      }}
                      content={{
                        label: isDragOver ? (
                          <p className="font-semibold text-white">
                            <span className="text-zinc-500">Drop file</span> to
                            upload
                          </p>
                        ) : (
                          <p className="font-semibold text-white">
                            <span className="text-zinc-500">
                              Click to upload
                            </span>{" "}
                            or drag and drop a photo here
                          </p>
                        ),
                        allowedContent: (
                          <div>
                            <p>PNG, JPG, JPEG</p>
                            <p>Maximum size 4 MB</p>
                          </div>
                        ),
                        uploadIcon: isDragOver ? (
                          <ImageUp className="text-white size-7" />
                        ) : (
                          <ImageDown className="text-white size-7" />
                        ),
                      }}
                      className="border border-white border-solid "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
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

export default PatientForm;
