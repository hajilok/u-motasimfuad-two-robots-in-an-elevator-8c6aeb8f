import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "Going to ten? Nice full charge... anyway, whoever unplugged me at 3 a.m. probably really needed the fast charger.";

function validateLine(line: string): void {
  const charCount = [...line].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Entry length ${charCount} outside allowed range [1, 200].`);
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only.");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line.");
  }
  if (Buffer.byteLength(line, "utf8") === 0) {
    throw new Error("Entry must be non-empty UTF-8.");
  }
}

function main(): void {
  validateLine(ENTRY_LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, ENTRY_LINE, { encoding: "utf8" });
}

main();
