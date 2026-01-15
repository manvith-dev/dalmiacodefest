"use client";

import { Button } from "@/components/ui/button";
import { H4, Muted } from "@/components/Typography";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { useRound2Context } from "../controllers/RoundTwoContesxt";
import { useState } from "react";
import { toast } from "sonner";
import Score from "./Score";
import { Badge } from "@/components/ui/badge";
import { Timer } from "./Timer";

export default function ProblemContainer() {
  const { questionNo, question, onNext, onCheck, submit, secondsLeft } =
    useRound2Context();
  const [userAnswer, setUserAnswer] = useState<string>("");

  const handleNext = () => {
    setUserAnswer("");
    onNext();
  };

  const handleCheck = () => {
    const correct = onCheck(userAnswer);
    if (correct) toast.success("✅ Correct Answer!");
    else toast.error("❌ Wrong Answer, try again.");
  };

  return (
    <section className="bg-card flex-1 min-w-0 rounded-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <H4 className="font-medium">Problem</H4>

        <div className="flex gap-2">
          <Score />
          <Timer />
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={handleNext}>
            Next
          </Button>
          <Button size="sm" onClick={() => submit(secondsLeft)}>
            Submit
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-5 flex-1">
        {/* Question */}
        <div className="flex flex-col gap-2">
          <H4 className="mb-1">Question {questionNo}</H4>
          <Muted>Fix the bug and determine the correct output</Muted>
          <Badge variant={"medium"} className="font-semibold">
            Worth: {Math.max(0, question.maxMarks - question.tries)}
          </Badge>
        </div>

        {/* Output input */}
        <div className="flex gap-3 items-end">
          <InputWithLabel
            id="output"
            label="Program Output"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter output from terminal"
          />
          <Button
            variant="secondary"
            onClick={() => handleCheck()}
            disabled={question.solved}
          >
            Check
          </Button>
        </div>
        {/* Instructions */}
        <div className="space-y-2">
          <H4 className="text-base font-medium">Instructions</H4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Copy the code into your local IDE</li>
            <li>Fix the bug without changing logic</li>
            <li>Run the program and observe output</li>
            <li>Submit the final output here</li>
            <li className="text-red-300">
              Each incorrect attempt reduces your maximum marks by 1
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
