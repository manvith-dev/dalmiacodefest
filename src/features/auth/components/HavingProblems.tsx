"use client";

import { H4 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HavingProblems() {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center gap-4">
      <H4>Any problem?</H4>
      <Button
        className="bg-foreground text-background ring ring-inset hover:bg-background hover:text-foreground hover:ring-1"
        size="sm"
        variant="default"
        asChild
      >
        <Link href="/#contact">Contact Us</Link>
      </Button>
    </div>
  );
}
