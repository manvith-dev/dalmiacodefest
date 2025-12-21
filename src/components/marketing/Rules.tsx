import { H2 } from "@/components/Typography";

export default function Rules() {
  return (
    <section id="rules" className=" p-16">
      <H2>Rules / Eligibility</H2>
      <ul className="list-disc p-4 space-y-3 leading-relaxed tracking-wide text-sm">
        <li>
          Open to <strong>all students</strong> interested in coding.
        </li>
        <li>
          Each team must consist of <strong>exactly two members</strong>.
        </li>
        <li>
          <strong>Online registration is mandatory.</strong>
        </li>
        <li>
          Participants are <strong>not required</strong> to bring their own
          laptops.
        </li>
        <li>
          Each participant must carry a <strong>valid college ID card</strong>.
        </li>
        <li>
          <strong>Team members cannot be changed</strong> after registration.
        </li>
        <li>
          <strong>Judges’ decisions will be final.</strong>
        </li>
      </ul>
    </section>
  );
}
