import {
  H1,
  H2,
  H3,
  P,
  Lead,
  Blockquote,
  Muted,
} from "@/components/Typography";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8 px-4">
      <H1>Terms & Conditions</H1>
      <Lead>
        These terms govern participation in the event. Participation implies
        full acceptance.
      </Lead>

      <H2>Eligibility</H2>
      <P>
        Participation is limited to eligible students as defined by the event
        organizers. Team size and structure must follow the announced rules.
      </P>

      <H2>Fair Play</H2>
      <P>
        Plagiarism, copying solutions, sharing answers, or exploiting platform
        loopholes is strictly prohibited.
      </P>

      <Blockquote>
        Clever solutions are encouraged. Clever cheating is not.
      </Blockquote>

      <H2>Use of Tools</H2>
      <P>
        External tools, IDEs, browsers, or AI systems are allowed only if
        explicitly permitted for a given round. Violations result in immediate
        disqualification.
      </P>

      <H2>Judging</H2>
      <P>
        All judging decisions are final. Scores, rankings, and outcomes are not
        open to appeal.
      </P>

      <H2>Technical Limitations</H2>
      <P>
        The organizers are not responsible for internet issues, power failures,
        device crashes, or software errors during the event.
      </P>

      <H2>Platform Misuse</H2>
      <P>
        Any attempt to hack the platform, manipulate scores, or access
        restricted data will result in immediate removal from the competition.
      </P>

      <H2>Right to Modify</H2>
      <P>
        The organizers reserve the right to modify rules, rounds, or scoring
        mechanisms if required to maintain fairness.
      </P>

      <H2>Liability</H2>
      <P>
        Participation is at your own risk. The organizers are not liable for
        data loss, score discrepancies, or disqualification consequences.
      </P>

      <Muted>Rules apply for the duration of the event.</Muted>
    </div>
  );
}
