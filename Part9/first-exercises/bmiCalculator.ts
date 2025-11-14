function calculateBmi(heigth: number, weight: number): string {
  const bmi: number = weight / (heigth * heigth)
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 24.9) {
    return 'normal weight'
  } else if (bmi < 29.9) {
    return 'overweigth'
  } else if (bmi >= 30) {
    return 'obese'
  }
  return 'something went wrong'
}
console.log(calculateBmi(180, 74))

