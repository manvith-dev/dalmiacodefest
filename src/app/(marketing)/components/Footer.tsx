import { H3, H4, Muted } from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const footerData = {
  brand: "DCF",
  location: {
    title: "Where?",
    address: [
      "Prahladrai Dalmia Lions College",
      "Sunder Nagar",
      "Malad (W), Maharashtra",
      "400064",
    ],
    mapLink: "https://maps.app.goo.gl/mXsyMt9KEBXHqfhy8",
  },
  time: {
    title: "When?",
    date: "30th January, 2026",
    hours: "9:00 AM - 12:00 PM",
  },
  sections: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "#about" },
        { label: "Rules", href: "#rules" },
        { label: "Contact", href: "#contact" },
        { label: "Register", href: "/register" },
      ],
    },
    {
      title: "Social",
      links: [
        {
          label: "dalmialionscollege.ac.in",
          href: "https://dalmialionscollege.ac.in/",
        },
        { label: "Instagram", href: "https://www.instagram.com/pdlcdlita" },
        { label: "Facebook", href: "https://www.facebook.com/pdlcdlita" },
      ],
    },
  ],
};

export default function Footer() {
  const year: string = new Date().getFullYear().toString();

  return (
    <footer className="flex flex-col items-center border-t py-16 gap-8">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl px-6">
        <H3>{footerData.brand}</H3>

        <div className="flex flex-1 flex-col items-start">
          <H4>{footerData.location.title}</H4>
          <Muted>
            {footerData.location.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </Muted>
          <Link
            className="text-sm underline"
            href={footerData.location.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            view on map
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-start">
          <H4>{footerData.time.title}</H4>
          <Muted>{footerData.time.date}</Muted>
          <Muted>{footerData.time.hours}</Muted>
        </div>

        {footerData.sections.map((section) => (
          <div key={section.title} className="flex flex-1 flex-col items-start">
            <H4>{section.title}</H4>
            {section.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Muted>{`© ${year} Dalmia Code Fest v1.0`}</Muted>
        <Separator orientation="vertical" />
        <Link
          className="text-sm underline underline-offset-4"
          href={"/pages/privacy"}
        >
          Privacy Policy
        </Link>
        <Separator orientation="vertical" />
        <Link
          className="text-sm underline underline-offset-4"
          href={"/pages/terms"}
        >
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
