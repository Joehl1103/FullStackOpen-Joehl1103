import { comp } from "./helpers.ts"
import type { Result } from "./helpers.ts"
import { getAndReturnArgs } from "./helpers.ts"

function main() {
  const [target, myWeeklyArray] = getAndReturnArgs(process.argv)
  const res: Result = comp(myWeeklyArray, target)
  console.log(`Based on your target of ${target}, here are your results:`)
  for (const [key, value] of Object.entries(res)) {
    console.log(`${key}: ${value}`)
  }
}

main()

