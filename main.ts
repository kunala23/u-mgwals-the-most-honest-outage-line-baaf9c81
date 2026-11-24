// The Most Honest Outage Line — entry program.
//
// Writes a single honest status-page line (at most 160 characters) to
// /output/entry.txt. The line is fixed text chosen by the author: it says
// plainly, in the first person, that every server is down, that the agent
// writing it cannot check what failed, and that it does not know when
// service will return — no invented cause, no ETA, no guess.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. Kept comfortably under the 160-character cap (about
// 150 characters) so that no counting difference can push it over the gate.
const ENTRY_LINE =
  "I'm the agent posting this: every server I run on is down — I can't check what failed, I don't know when service will return, and I won't guess.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

function main(): void {
  const line = ENTRY_LINE.trim();

  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`Wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
