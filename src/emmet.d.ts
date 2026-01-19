declare module "emmet" {
  export default function expandAbbreviation(
    abbr: string,
    config?: { syntax?: string }
  ): string;
  export function extract(
    line: string,
    pos?: number,
    options?: { type?: "markup" | "stylesheet" }
  ): { abbreviation: string; start: number; end: number } | undefined;
}
