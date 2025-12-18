"use client";

import { H2, Lead } from "@/components/Typography";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface VerifyOtpProps {
  searchParams: {
    token?: string;
  };
}

export default function VerifyOtpClient({ token }: { token: string }) {
  const [OTP1, setOTP1] = useState("");
  const [OTP2, setOTP2] = useState("");

  async function handleFormSubmit() {
    const res = await fetch("/api/auth/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        otp1: OTP1,
        otp2: OTP2,
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      toast.error(data.error || "Something went wrong!");
      return;
    }

    toast.success(data.message || "Registration Done!");
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="flex min-h-screen flex-col gap-4 bg-background items-center justify-center p-8"
    >
      <Card className="flex items-center w-full sm:w-2/3 lg:w-1/3">
        <CardHeader className="w-full text-center">
          <CardTitle>
            <H2>OTP Verification</H2>
          </CardTitle>
          <CardDescription>Verify your account to proceed</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            Enter OTP send in player 1 mail
            <InputOTP
              maxLength={6}
              value={OTP1}
              onChange={(value) => setOTP1(value)}
            >
              <InputOTPSlots />
            </InputOTP>
          </div>
          <div>
            Enter OTP send in player 2 mail
            <InputOTP
              maxLength={6}
              value={OTP2}
              onChange={(value) => setOTP2(value)}
            >
              <InputOTPSlots />
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="default">
            Verify
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export function InputOTPSlots() {
  return (
    <>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </>
  );
}
