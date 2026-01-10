import { calculateBmi } from "./bmiCalculator.ts";

test('bmi calc', () => {
  const arr: Array<[number, string]> = [
    [131.5694, 'underweight'],
    [177.3327, 'normal weight'],
    [213.0853, 'overweight'],
    [221.6659, 'obese']
  ];

  function calcBmi(height: number, weight: number): string {
    return calculateBmi(height, weight);
  };
  arr.forEach(([weight, response]) => {
    expect(calcBmi(5.9, weight)).toBe(response);
  });
});
