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

  //Regex
  const teamNameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9 _-]{3,20}$/;
  const nameRegex = /^[A-Za-z ]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  //Regex Tests

  //Team name check
  if (!teamNameRegex.test(values.teamName.trim()))
    errors.push("Team Name is invalid.");

  //Names Check
  if (!nameRegex.test(values.p1name.trim()))
    errors.push("Player 1 Name is invalid.");
  if (!nameRegex.test(values.p2name.trim()))
    errors.push("Player 2 Name is invalid.");

  //Email Checks
  if (values.p1email.length < 6 || !emailRegex.test(values.p1email))
    errors.push("Player 1 Email is invalid.");
  if (values.p2email.length < 6 || !emailRegex.test(values.p2email))
    errors.push("Player 2 Email is invalid.");

  //Phone checks
  if (!phoneRegex.test(values.p1phone.trim()))
    errors.push("Player 1 Phone is invalid.");
  if (!phoneRegex.test(values.p2phone.trim()))
    errors.push("Player 2 Phone is invalid.");

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
