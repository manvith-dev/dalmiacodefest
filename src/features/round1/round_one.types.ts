export type Round1QuestionsType = {
  _id?: string;
  question: string;
  options: string[];
  correctOption: 0 | 1 | 2 | 3;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
  isActive: boolean;
  userAnswer: null | number;
  isCorrect: null | boolean;
  isVisited: boolean;
};
