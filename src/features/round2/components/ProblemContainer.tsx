"use client";

import { Button } from "@/components/ui/button";
import { P, H4, Muted } from "@/components/Typography";
import { InputWithLabel } from "@/features/auth/components/InputWithLabel";
import { useRound2Context } from "../controllers/RoundTwoContesxt";
import { useState } from "react";
import { toast } from "sonner";
import Score from "./Score";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";

export default function ProblemContainer() {
  const { questionNo, question, onNext, onCheck, submit, secondsLeft } =
    useRound2Context();
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    <section className="bg-card md:col-span-1 min-w-0 rounded-md ">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <H4 className="font-medium">Problem</H4>

        <div className="flex gap-2">
          <Score />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-foreground text-background hover:text-foreground"
            onClick={handleNext}
          >
            Next
          </Button>
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"sm"} disabled={loading} className="flex w-full">
                  Submit
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4">
                  <P>Are you sure you want to submit?</P>
                  <Button
                    disabled={loading}
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await submit(secondsLeft);
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {loading && <Spinner />}
                    Confirm Submit
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
