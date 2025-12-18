import VerifyOtpClient from "./VerifyOtpClient";

interface VerifyOtpPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function VerifyOtpPage({
  searchParams,
}: VerifyOtpPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <p>Invalid or missing token</p>;
  }

  return <VerifyOtpClient token={token} />;
}
