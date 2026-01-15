export type Language = "java" | "cpp" | "python";

export type Round2QuestionsType = {
  questionNo: number;
  language: Language;
  code: string;
  expectedOutput: string;
  tries: number;
  maxMarks: number;
  solved: boolean;
};
