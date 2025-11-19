import { calculateBmi } from "./bmiCalculator.ts";
import { getAndSeparateHeightandWeight } from "./helpers.ts";

function main(): void {
  const [height, weight] = getAndSeparateHeightandWeight(process.argv);
  console.log(calculateBmi(height, weight));
};

main();
