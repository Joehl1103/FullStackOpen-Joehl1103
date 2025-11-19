import { comp } from "./helpers.ts";
import type { Result } from "./helpers.ts";
import { getAndReturnArgs } from "./helpers.ts";

function main() {
  const [target, myWeeklyArray] = getAndReturnArgs(process.argv);
  const res: Result = comp(myWeeklyArray, target);
  for (const [key, value] of Object.entries(res)) {
    console.log(`${key}: ${value}`);
  };
};

main();

