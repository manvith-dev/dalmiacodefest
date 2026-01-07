"use client";

import { H2 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { END_TIME_KEY, STORAGE_KEY } from "@/features/round1/config/constants";

export default function Round1Login() {
  return (
    <main className="min-h-screen bg-grid flex items-center justify-center px-4">
      <Round1LoginForm />
    </main>
  );
}

function Round1LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", code: "" });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFormSubmit() {
    const email = values.email.trim();
    const code = values.code.trim();

    if (!email || !code) {
      toast.error("Please fill both the fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/round1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.questions));
        localStorage.setItem(END_TIME_KEY, JSON.stringify(data.endTime));
        toast.success(data.message || "Login successful");
        router.push("/round1/quiz");
      }
    } catch {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="w-full max-w-md"
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-8 sm:p-10 space-y-6">
        <div className="text-center">
          <H2>Round 1 Login</H2>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your registered email and access code
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputWithLabel
            label="Email ID"
            id="email"
            type="email"
            placeholder="enter email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <InputWithLabel
            type="password"
            inputMode="numeric"
            maxLength={6}
            label="6 Digit Code"
            id="code"
            placeholder="enter the 6 digit code"
            value={values.code}
            onChange={(e) => setValues({ ...values, code: e.target.value })}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Spinner className="mr-2" />}
          Login
        </Button>
      </div>
    </form>
  );
}
