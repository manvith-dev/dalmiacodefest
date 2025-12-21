export const EVENT = {
  name: "DALMIA CODE FEST 1.0",
  tagline: "IoT - Ignition of Talents",
  description:
    "A three-round tech challenge where teams battle through, rapid-fire logic, design, and real coding. Built to test how fast you think, how well you create, and how smart you solve",
  date: "2026-01-31",
  time: "9:00 AM - 12:00 PM",
  startAt: "2026-01-31T09:00:00+05:30",
  WhatsAppGroupLink: "",
};

export const GAMES = {
  round1: {
    name: "ROUND 1: QUIZ",
    description: "A fast-paced quiz testing tech knowledge and logic.",
    rules: [
      "Teams answer a fixed set of questions within the time limit.",
      "No external resources are allowed.",
      "Accuracy determines the score; time breaks ties.",
    ],
  },

  round2: {
    name: "ROUND 2: THE BUG",
    description: "Find and fix errors in given code snippets.",
    rules: [
      "Buggy code is provided to each team.",
      "Solutions must compile and run correctly.",
      "Partial fixes earn partial points.",
    ],
  },

  round3: {
    name: "ROUND 3: CODEMATICS",
    description: "Solve logical problems using code.",
    rules: [
      "Problems increase in difficulty.",
      "Any allowed programming language may be used.",
      "Scoring is based on correctness and efficiency.",
    ],
  },
};
