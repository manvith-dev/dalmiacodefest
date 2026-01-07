import { Pagination } from "./Pagination";
import { Score } from "./Score";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "../controllers/QuizContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { H2, H4, P } from "@/components/Typography";
import { Timer } from "./Timer";

export function SideBar() {
  const { submit, secondsLeft } = useQuizContext();
  return (
    <aside className="border-l bg-background p-4 flex flex-col h-full">
      <div className="space-y-6">
        <Score />
        <Pagination />
        <Timer />
      </div>

      <div className="mt-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full">Submit</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <P>Are you sure you want to submit?</P>
              <Button onClick={() => submit(secondsLeft)}>
                Confirm Submit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}
