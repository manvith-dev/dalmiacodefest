"use client";

import { H2, Lead } from "@/components/Typography";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import HavingProblems from "@/features/auth/components/HavingProblems";
import Link from "next/link";

export default function ResendEmailPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full flex flex-col items-center justify-center p-4 gap-6">
        <HavingProblems />
        <div className="flex flex-col items-center justify-center">
          <H2>RESEND EMAIL</H2>
          <Lead>Enter both registered emails</Lead>
        </div>
        <ResendEmailForm />
      </section>
    </main>
  );
}

function ResendEmailForm() {
  const [values, setValues] = useState({
    email1: "",
    email2: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFormSubmit() {
    if (values.email1.trim().length === 0) {
      toast.error("Please enter email 1");
      return;
    }
    if (values.email2.trim().length === 0) {
      toast.error("Please enter email 2");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success(data.message || "Mail sent!");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="flex flex-col w-full items-center justify-center"
      >
        <div className="flex items-center justify-center flex-col gap-4 w-full p-8">
          <InputWithLabel
            label="Player 1 email:"
            id="email1"
            type="email"
            placeholder="Enter email 1"
            value={values.email1}
            onChange={(e) => {
              setValues({ ...values, email1: e.target.value });
            }}
          />
          <InputWithLabel
            label="Player 2 email:"
            id="email2"
            type="email"
            placeholder="Enter email 2"
            value={values.email2}
            onChange={(e) => {
              setValues({ ...values, email2: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <Button type="submit" variant="default" disabled={loading}>
            {loading && <Spinner className="mr-2" />}
            Resend confirmation email
          </Button>
          <Button type="button" variant="link" asChild>
            <Link href={"register"}>Didn't Register? Register Now</Link>
          </Button>
        </div>
      </form>
    </>
  );
}
