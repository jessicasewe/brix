import { codeToHtml } from "shiki";

export async function highlight(code: string, lang: "tsx" | "astro"): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}
