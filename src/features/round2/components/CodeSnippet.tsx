"use client";

import { useEffect, useState } from "react";
import { highlightCode } from "@/lib/shiki";

export default function CodeSnippet({
  code,
  language,
}: {
  code: string;
  language: "java" | "cpp" | "python";
}) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    highlightCode(code, language).then(setHtml);
  }, [code, language]);

  // Inside CodeSnippet.tsx
  return (
    <div
      className="bg-[#24292d] w-full rounded-md pb-4 px-4 font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
