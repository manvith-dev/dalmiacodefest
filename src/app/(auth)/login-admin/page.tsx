"use client";

import { useState } from "react";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { H2 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export type LoginFormValues = {
  username: string;
  password: string;
};

export default function AdminLoginPage() {
  return (
    <main className="flex">
      <section className="flex flex-col flex-1 border min-h-screen items-center justify-center p-4">
        <AdminLoginForm />
      </section>
    </main>
  );
}

function AdminLoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleFormSubmit() {
    if (values.username.trim().length === 0) {
      toast.error("Please enter admin username");
      return;
    }
    if (values.password.trim().length === 0) {
      toast.error("Please enter admin password");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login/admin", {
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
        router.push("/admin/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <H2>DCF Admin Login</H2>
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
            label="Admin username:"
            id="username"
            placeholder="Enter admin username"
            value={values.username}
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
          />
          <InputWithLabel
            label="Admin password:"
            id="password"
            placeholder="Enter admin password"
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
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
              router.push("/login");
            }}
          >
            Are you a participant?
          </Button>
        </div>
      </form>
    </>
  );
}
