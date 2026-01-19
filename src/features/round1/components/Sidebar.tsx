import { Pagination } from "./Pagination";
import { Score } from "./Score";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "../controllers/QuizContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { P } from "@/components/Typography";
import { Timer } from "./Timer";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function SideBar() {
  const { submit, secondsLeft } = useQuizContext();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <aside className="border bg-background p-4 flex flex-col h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center justify-between">
          <Score />
          <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button disabled={loading} className="flex w-full">
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
        <Pagination />
        <Timer />
      </div>
    </aside>
  );
}
