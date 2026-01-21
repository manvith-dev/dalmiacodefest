import React, { createContext, useCallback, useContext } from "react";
import useRound3CodeMatics from "./useRoundThreeCodeMatics";
import { Round3QuestionsType } from "../round_three.types";
import { END_TIME_KEY } from "../config/constants";
import { useTimer } from "@/components/layout/games/useTimer";

type Round3ContextType = ReturnType<typeof useRound3CodeMatics> & {
  secondsLeft: number;
};

const Round3Context = createContext<Round3ContextType | null>(null);

export function Round3Provider({
  questions,
  children,
}: {
  questions: Round3QuestionsType[];
  children: React.ReactNode;
}) {
  const game = useRound3CodeMatics(questions);
  const onTimeUp = useCallback(
    (remaining: number) => {
      game.submit(remaining);
    },
    [game],
  );

  const secondsLeft = useTimer(END_TIME_KEY, onTimeUp);
  return (
    <Round3Context.Provider value={{ ...game, secondsLeft }}>
      {children}
    </Round3Context.Provider>
  );
}

export function useRound3Context() {
  const ctx = useContext(Round3Context);
  if (!ctx)
    throw new Error("useRound3Context must be used inside Round3Provider");
  return ctx;
}
