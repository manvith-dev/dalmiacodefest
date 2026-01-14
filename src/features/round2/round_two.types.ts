export type Round2Questions = {
  question: number;
  language: "java" | "cpp" | "py";
  code: string;
  expectedOutput: string[];

  // NEW
  tries: number;
  maxMarks: number;
  solved: boolean;
};
