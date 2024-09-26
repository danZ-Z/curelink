"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Footer = () => {
  const [value, setValue] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const router = useRouter();

  function handleClick() {
    if (value === process.env.NEXT_PUBLIC_ADMIN_CODE) {
      router.push("/pages/admin");
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  return (
    <div className="text-zinc-500">
      <div className="flex flex-row gap-20 md:gap-40">
        <p>&copy; 2024 CureLink</p>

        <Dialog>
          <DialogTrigger className="text-zinc-500 hover:text-zinc-200 duration-300">Admin</DialogTrigger>
          <DialogContent className=" bg-zinc-900">
            <DialogHeader>
              <DialogTitle className="flex flex-col justify-center text-center text-white">
                Access Verification
              </DialogTitle>
              <DialogDescription className="flex flex-col justify-center text-center text-zinc-400">
                To access the admin page, please enter the passkey
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className="flex mx-auto py-5 ">
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white " index={0} />
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white" index={1} />
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white" index={2} />
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white" index={3} />
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white" index={4} />
                    <InputOTPSlot className="size-16 text-3xl font-semibold text-teal-500 shadow-sm shadow-white" index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {isCorrect ? null : (
                  <div className="text-red-500 pb-5 font-semibold text-lg">
                    Wrong Code!
                  </div>
                )}
                <Button
                  size="lg"
                  onClick={handleClick}
                  className="bg-teal-700 hover:bg-teal-700/80"
                >
                  Enter admin panel
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Footer;
