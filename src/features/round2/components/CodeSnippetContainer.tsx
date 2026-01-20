import CodeSnippet from "@/features/round2/components/CodeSnippet";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRound2Context } from "../controllers/RoundTwoContesxt";
import { Copy } from "lucide-react";
import { Timer } from "./Timer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CodeSnippetContainer() {
  const { question, onSwitchLanguage } = useRound2Context();

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(question.code);
      toast.success("Code copied to clipboard");
    } catch {
      toast.success("Text Not Copied");
    }
  };
  return (
    <section className="bg-card md:col-span-1 rounded-md">
      <div className="bg-card flex flex-row items-center justify-between w-full py-2 px-4 rounded-t-md ">
        <span>Code</span>
        <Timer />
        <div className="flex gap-2 items-center justify-center">
          <Select
            onValueChange={(value) =>
              onSwitchLanguage(value as "java" | "cpp" | "python")
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
          <Button size={"sm"} variant={"ghost"} onClick={handleCopy}>
            <Copy /> Copy
          </Button>
        </div>
      </div>

      {/* Code Container */}
      <div className="flex-1 min-h-0 overflow-y-scroll scrollbar m-2">
        <CodeSnippet code={question.code} language="python" />
      </div>
    </section>
  );
}
