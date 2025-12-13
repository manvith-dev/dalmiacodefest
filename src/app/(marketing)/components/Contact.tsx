import { H2 } from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="flex flex-col p-16 gap-4">
      <H2>Contact</H2>
      <div className="flex flex-row gap-4">
        <ContactCard
          name="Manvith Poojary"
          role="student"
          phone="+91 91566 91445"
        />
        <ContactCard
          name="Priyanshu Pal"
          role="student"
          phone="+91 90761 89264"
        />
        <ContactCard
          name="Paras Panchal"
          role="student"
          phone="+91 84529 18705"
        />
      </div>
    </section>
  );
}

function ContactCard({
  name,
  role,
  phone,
}: {
  name: string;
  role: string;
  phone: string;
}) {
  const whatsappNumber = phone.replace(/\D/g, "");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          <strong>Phone:</strong> {phone}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20have%20a%20question%20about%20Dalmia%20Code%20Fest`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Chat On WhatsApp</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
