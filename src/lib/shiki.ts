import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

// Singleton highlighter
export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark"], // or 'monokai' etc.
      langs: ["java", "cpp", "python"],
    });
  }
  return highlighter;
}

// Helper to get HTML
export async function highlightCode(
  code: string,
  language: "java" | "cpp" | "python"
) {
  const h = await getHighlighter();
  return h.codeToHtml(code, { lang: language, theme: "github-dark" });
}
