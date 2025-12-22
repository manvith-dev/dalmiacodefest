import { H2 } from "@/components/Typography";
import { MESSAGES } from "@/features/participants/config/updates";

export default function Inbox() {
  return (
    <main className="flex flex-col items-center gap-4 px-4 py-6">
      <H2>UPDATES</H2>

      {MESSAGES.map((m, i) => (
        <Message key={i} head={m.heading} msg={m.message} date={m.date} />
      ))}
    </main>
  );
}

function Message({
  head,
  msg,
  date,
}: {
  head: string;
  msg: string;
  date: string;
}) {
  return (
    <div className="w-full max-w-xl rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{head}</h3>

        {date && (
          <span className="text-xs text-white/50 whitespace-nowrap">
            {date}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-white/80 leading-relaxed">{msg}</p>
    </div>
  );
}
