import { comp } from "./exerciseCalculatorHelpers.ts"
import type { Result } from "./exerciseCalculatorHelpers.ts"

function main() {
  const myWeeklyArray: number[] = [3, 0, 2, 4.5, 0, 3, 1]
  const target: number = 2
  const res: Result = comp(myWeeklyArray, target)
  console.log(`Based on your target of ${target}, here are your results:`)
  for (const [key, value] of Object.entries(res)) {
    console.log(`${key}: ${value}`)
  }
}

main()

