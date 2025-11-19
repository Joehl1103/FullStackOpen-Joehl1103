function convertHeightToInches(heightInFeet: number): number {
  return heightInFeet * 12;
};

export function calculateBmi(height: number, weight: number): string {
  const bmi: number = weight * 703 / (convertHeightToInches(height) * convertHeightToInches(height));
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 24.9) {
    return 'normal weight';
  } else if (bmi < 29.9) {
    return 'overweight';
  } else if (bmi >= 30) {
    return 'obese';
  }
  return 'something went wrong';
};

