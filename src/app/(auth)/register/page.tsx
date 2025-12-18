"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { H2, Muted } from "@/components/Typography";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";
import { COLLEGES } from "@/config/colleges";
import { Spinner } from "@/components/ui/spinner";
import validateInputs from "@/lib/register/validations";
import { useRouter } from "next/navigation";

export type RegisterFormValues = {
  teamName: string;
  clgName: string;
  p1name: string;
  p1email: string;
  p1phone: string;
  p2name: string;
  p2email: string;
  p2phone: string;
};

export default function RegisterPage() {
  return (
    <main className="flex flex-row">
      <section className="bg-secondary flex flex-1 flex-col items-center justify-center min-h-screen p-4 border"></section>
      <RegisterForm />
    </main>
  );
}

function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>({
    teamName: "",
    clgName: "",
    p1name: "",
    p1email: "",
    p1phone: "",
    p2name: "",
    p2email: "",
    p2phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleFormSubmit() {
    setLoading(true);
    const errors = validateInputs(values);
    if (errors.length) {
      toast.error(
        <ul className="list-disc pl-4">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      );
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
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
        toast.error(data.error || "Registration Failed");
      } else {
        toast.success(
          "Data submitted successfully! Verify your email to confirm."
        );
        if (data.token) router.push(`/verifyotp?token=${data.token}`);
        else toast.error("Invalid Response");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="flex flex-1 flex-col gap-6 items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center">
          <H2>DCF Registration</H2>
          <Muted>Register your team for the event</Muted>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="flex flex-col gap-6 w-full items-center justify-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <InputWithLabel
              label="Team Name"
              id="teamName"
              placeholder="Enter your team name"
              value={values.teamName}
              onChange={(e) => {
                setValues({ ...values, teamName: e.target.value });
              }}
            />
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>Select College</Label>
              <Combobox
                itemType="college"
                list={COLLEGES}
                value={values.clgName}
                onChange={(val) => {
                  setValues({ ...values, clgName: val });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <InputWithLabel
              label="Player 1 Name"
              id="p1name"
              placeholder="Enter player 1 name"
              value={values.p1name}
              onChange={(e) => {
                setValues({ ...values, p1name: e.target.value });
              }}
            />
            <InputWithLabel
              label="Player 2 Name"
              id="p2name"
              placeholder="Enter player 2 name"
              value={values.p2name}
              onChange={(e) => {
                setValues({ ...values, p2name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <InputWithLabel
              label="Player 1 Email"
              id="p1email"
              placeholder="Enter player 1 email"
              value={values.p1email}
              onChange={(e) => {
                setValues({ ...values, p1email: e.target.value });
              }}
            />
            <InputWithLabel
              label="Player 2 Email"
              id="p2email"
              placeholder="Enter player 2 email"
              value={values.p2email}
              onChange={(e) => {
                setValues({ ...values, p2email: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <InputWithLabel
              label="Player 1 Phone"
              id="p1phone"
              placeholder="Enter player 1 phone"
              value={values.p1phone}
              onChange={(e) => {
                setValues({ ...values, p1phone: e.target.value });
              }}
            />
            <InputWithLabel
              label="Player 2 Phone"
              id="p2phone"
              placeholder="Enter player 2 phone"
              value={values.p2phone}
              onChange={(e) => {
                setValues({ ...values, p2phone: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button className="flex" type="submit" disabled={loading}>
              {loading && <Spinner />}
              Register
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export function InputWithLabel({
  label,
  id,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input type="text" id={id} placeholder={placeholder} {...props} />
    </div>
  );
}
