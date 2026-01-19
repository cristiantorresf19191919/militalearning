declare module "@babel/standalone" {
  export function transform(
    code: string,
    options?: { presets?: unknown[]; sourceType?: string; filename?: string }
  ): { code?: string | null };
}
