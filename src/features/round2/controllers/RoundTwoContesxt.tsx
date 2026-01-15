import React, { createContext, useCallback, useContext } from "react";
import useRound2Debug from "./useRound2Debug";
import { Round2QuestionsType } from "../round_two.types";
import { END_TIME_KEY } from "../config/constants";
import { useTimer } from "@/components/layout/games/useTimer";

type Round2ContextType = ReturnType<typeof useRound2Debug> & {
  secondsLeft: number;
};

const Round2Context = createContext<Round2ContextType | null>(null);

export function Round2Provider({
  questions,
  children,
}: {
  questions: Round2QuestionsType[];
  children: React.ReactNode;
}) {
  const game = useRound2Debug(questions);
  const onTimeUp = useCallback(
    (remaining: number) => {
      game.submit(remaining);
    },
    [game]
  );

  const secondsLeft = useTimer(END_TIME_KEY, onTimeUp);
  return (
    <Round2Context.Provider value={{ ...game, secondsLeft }}>
      {children}
    </Round2Context.Provider>
  );
}

export function useRound2Context() {
  const ctx = useContext(Round2Context);
  if (!ctx)
    throw new Error("useRound2Context must be used inside Round2Provider");
  return ctx;
}
