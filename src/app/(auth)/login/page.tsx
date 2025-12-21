"use client";

import { useState } from "react";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { H2 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export type LoginFormValues = {
  regiId: string;
  email: string;
};

export default function LoginPage() {
  return (
    <main className="flex">
      <section className="bg-secondary hidden sm:flex flex-1 border">
        Yo
      </section>
      <section className="flex flex-col flex-1 border min-h-screen items-center justify-center p-4">
        <LoginForm />
      </section>
    </main>
  );
}

function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    regiId: "",
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleFormSubmit() {
    if (values.regiId.trim().length === 0) {
      toast.error("Please enter Registration ID");
      return;
    }
    if (values.email.trim().length === 0) {
      toast.error("Please enter any one email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
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
        toast.success(data.message || "Login Successful");
        router.push("/participants/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <H2>DCF Login</H2>
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="flex flex-col w-full items-center justify-center"
      >
        <div className="flex items-center justify-center flex-col gap-4 w-full p-8">
          <InputWithLabel
            label="Registration ID:"
            id="regiID"
            placeholder="check confirmation mail for ID"
            value={values.regiId}
            onChange={(e) => {
              setValues({ ...values, regiId: e.target.value });
            }}
          />
          <InputWithLabel
            label="Email:"
            id="email"
            placeholder="any one of the emails"
            value={values.email}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <Button type="submit" variant="default" disabled={loading}>
            {loading && <Spinner className="mr-2" />}
            Login
          </Button>
          <Button
            type="button"
            size="sm"
            variant="link"
            onClick={() => {
              router.push("/resend-email");
            }}
          >
            Didn't recieve mail?
          </Button>
          <Button
            type="button"
            size="sm"
            variant="link"
            onClick={() => {
              router.push("/admin");
            }}
          >
            Are you a admin?
          </Button>
        </div>
      </form>
    </>
  );
}
