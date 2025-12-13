import { H3, H4, Muted } from "@/components/Typography";
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
    mapLink: "/",
  },
  time: {
    title: "When?",
    date: "30th January, 2026",
    hours: "9:00 AM - 12:00 AM",
  },
  sections: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/" },
        { label: "Need Help?", href: "/" },
        { label: "Contact", href: "/" },
        { label: "Register", href: "/" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "dalmialionscollege.ac.in", href: "/" },
        { label: "Instagram", href: "/" },
        { label: "Facebook", href: "/" },
      ],
    },
    {
      title: "Legal Links",
      links: [
        { label: "Privacy Policy", href: "/" },
        { label: "Terms & Conditions", href: "/" },
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
      <Muted>{`© ${year} Dalmia Code Fest v1.0`}</Muted>
    </footer>
  );
}
