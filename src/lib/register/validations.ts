import { RegisterFormValues } from "@/app/(auth)/register/page";

function isEmptyCheck(values: RegisterFormValues) {
  const errors: string[] = [];

  if (!values.teamName.trim()) errors.push("Team Name is required");
  if (!values.clgName.trim()) errors.push("College Name is required");
  if (!values.p1name.trim()) errors.push("Player 1 Name is required");
  if (!values.p2name.trim()) errors.push("Player 2 Name is required");
  if (!values.p1email.trim()) errors.push("Player 1 Email is required");
  if (!values.p2email.trim()) errors.push("Player 2 Email is required");
  if (!values.p1phone.trim()) errors.push("Player 1 Phone is required");
  if (!values.p2phone.trim()) errors.push("Player 2 Phone is required");

  return errors;
}

function isEqualCheck(values: RegisterFormValues) {
  let errors: string[] = [];

  if (values.p1email === values.p2email)
    errors.push(" Player emails must be different.");
  if (values.p1phone === values.p2phone)
    errors.push("Player phone numbers must be different.");
  return errors;
}

function regexCheck(values: RegisterFormValues) {
  let errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  if (!emailRegex.test(values.p1email))
    errors.push(" Player 1 Email is invalid.");
  if (!emailRegex.test(values.p2email))
    errors.push(" Player 2 Email is invalid.");
  if (!phoneRegex.test(values.p1phone))
    errors.push(" Player 1 Phone is invalid.");
  if (!phoneRegex.test(values.p2phone))
    errors.push(" Player 2 Phone is invalid.");

  return errors;
}

export default function validateInputs(values: RegisterFormValues) {
  let errors = isEmptyCheck(values);
  if (errors.length) return errors;

  errors = regexCheck(values);
  if (errors.length) return errors;

  errors = isEqualCheck(values);
  return errors;
}
