"use client";

import CodeSnippetContainer from "@/features/round2/components/CodeSnippetContainer";
import ProblemContainer from "@/features/round2/components/ProblemContainer";

export default function Round2Page() {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 min-h-0">
      <CodeSnippetContainer />
      <ProblemContainer />
    </div>
  );
}
