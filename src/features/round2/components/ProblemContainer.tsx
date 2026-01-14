import { Button } from "@/components/ui/button";
import { Blockquote, H2, H4, P } from "@/components/Typography";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { Score } from "@/features/round1/components/Score";

export default function ProblemContainer() {
  return (
    <section className="bg-card flex-1 min-w-0 rounded-md">
      {/* Header */}
      <div className="bg-card flex flex-row items-center justify-between w-full py-2 px-4 rounded-t-md ">
        <span>Problem</span>
        <div className="flex flex-row gap-2">
          <Button size={"sm"} variant={"secondary"}>
            Next
          </Button>
          <Button size={"sm"}>Submit</Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-4">
        <H4>Question 1</H4>
        <Blockquote>Problem Statement</Blockquote>
        <P className="font-mono rounded-md p-2 mt-2">
          Performs DSF to find shortest path to the finish link in {"O(n)"} time
          Performs DSF to find shortest path to the finish link in {"O(n)"} time
          Performs DSF to find shortest path to the finish link in {"O(n)"} time
        </P>
        <Blockquote>Enter Output</Blockquote>
        <div className="flex flex-row gap-2 items-end">
          <InputWithLabel
            id="output"
            label=""
            placeholder="Enter the outupt from IDE terminal"
          />
          <Button>Check</Button>
        </div>
        <Blockquote>Instructions</Blockquote>
        <div>
          <ul className="flex flex-col gap-1 pl-8 text-sm list-disc">
            <li>Copy the code and fix errors in VS Code</li>
            <li>Copy the code and fix errors in VS Code</li>
            <li>Copy the code and fix errors in VS Code</li>
            <li>Copy the code and fix errors in VS Code</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
