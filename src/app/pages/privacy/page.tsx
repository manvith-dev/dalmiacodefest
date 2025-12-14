import {
  H1,
  H2,
  H3,
  P,
  Lead,
  Blockquote,
  Muted,
} from "@/components/Typography";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8 px-4">
      <H1>Privacy Policy</H1>
      <Lead>
        This policy explains what data we collect, why we collect it, and how it
        is used during the event.
      </Lead>

      <H2>Information We Collect</H2>
      <P>
        We collect basic participant information such as name, college, email
        address, phone number, team details, and game-related data including
        submissions, scores, and timestamps.
      </P>

      <H2>How We Use Your Data</H2>
      <P>
        Collected data is used strictly for operating the competition,
        evaluating performance, generating leaderboards, and communicating
        event-related updates.
      </P>

      <H2>Code & Submissions</H2>
      <P>
        Any code or answers submitted during the event are used only for judging
        and evaluation. We do not claim ownership of your solutions, logic, or
        ideas.
      </P>

      <H2>Data Sharing</H2>
      <P>
        Your data is not sold or shared with third parties. Access is limited to
        event organizers, judges, and college authorities if required.
      </P>

      <H2>Data Storage</H2>
      <P>
        Event data is stored temporarily for the purpose of result processing.
        Long-term storage or backups are not guaranteed.
      </P>

      <Blockquote>
        Do not submit sensitive personal or confidential information. This is a
        competitive event platform, not a secure vault.
      </Blockquote>

      <Muted>Last updated for the current event cycle.</Muted>
    </div>
  );
}
