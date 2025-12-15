"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COLLEGES } from "@/config/colleges";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { H1, H2, Lead } from "@/components/Typography";

const formSchema = z.object({
  teamName: z.string().min(3, "Team name is too short"),

  p1Name: z.string().min(3, "Player 1 name is too short"),
  p1Email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email",
  }),
  p1Phone: z.string().length(10, "Phone number must be 10 digits"),

  p2Name: z.string().min(3, "Player 2 name is too short"),
  p2Email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email",
  }),
  p2Phone: z.string().length(10, "Phone number must be 10 digits"),
});

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-row bg-background">
      <div className="hidden sm:flex flex-2 border items-center justify-center relative">
        <Image
          src="/auth-coding-bg.png"
          alt="static image"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="flex flex-col flex-2 gap-2 items-center p-8 justify-center">
        <H1>DCF</H1>
        <H2>Team Registration</H2>
        <RegisterForm />
      </div>
    </main>
  );
}

export function RegisterForm() {
  const form = useForm({
    defaultValues: {
      teamName: "",
      p1Name: "",
      p1Email: "",
      p1Phone: "",
      p2Name: "",
      p2Email: "",
      p2Phone: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });

  return (
    <Card className="bg-background w-full border-0">
      <CardHeader>
        <CardDescription className="text-center">
          All fields are required.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4 md:gap-2 space-y-1"
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FormField
              form={form}
              name="teamName"
              label="Team Name"
              placeholder="ex: avengers"
            />
            <Field>
              <FieldLabel>College</FieldLabel>
              <CollegeCombobox />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FormField form={form} name="p1Name" label="Player 1 Name" />
            <FormField form={form} name="p2Name" label="Player 2 Name" />
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FormField
              form={form}
              name="p1Email"
              label="Player 1 Email"
              type="email"
              placeholder="example@mr.com"
            />
            <FormField
              form={form}
              name="p2Email"
              label="Player 2 Email"
              type="email"
              placeholder="example@mr.com"
            />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FormField
              form={form}
              name="p1Phone"
              label="Player 1 Phone Number"
            />
            <FormField
              form={form}
              name="p2Phone"
              label="Player 2 Phone Number"
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="register-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

function FormField({
  form,
  name,
  label,
  type = "text",
  placeholder = "",
}: {
  form: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <form.Field
      name={name}
      children={(field: any) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              type={type}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
              autoComplete="off"
              placeholder={placeholder}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    />
  );
}

export function CollegeCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between overflow-hidden text-ellipsis w-full"
        >
          {value
            ? COLLEGES.find((college) => college.value === value)?.label
            : "Select college..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search college..." className="h-9" />
          <CommandList>
            <CommandEmpty>No college found.</CommandEmpty>
            <CommandGroup>
              {COLLEGES.map((college) => (
                <CommandItem
                  key={college.value}
                  value={college.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {college.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === college.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
