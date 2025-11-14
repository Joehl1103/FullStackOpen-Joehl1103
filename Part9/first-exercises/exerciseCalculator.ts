interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export function calcTrainingDays(weekArray: number[]) {
  return weekArray.filter(i => i > 0).length
}

export function calculateAvg(weekArray: number[]): number {
  if (weekArray.length < 7) {
    throw new Error(`Your array should include 7 items. It currently only includes ${weekArray.length}`);
  }
  const sum = weekArray.reduce((acc, current) => acc += current, 0)

  return sum / weekArray.length
}

export function calcSuccess(average: number, target: number,): boolean {
  return average >= target ? true : false
}

export function rate(average: number, target: number): number {
  const num = (average * 3) / target
  return Number(num.toPrecision(2))
}

export function describeRating(rating: number): string {
  if (rating >= 3) {
    return 'Great! Met or exceeded expectations!'
  } else if (rating >= 1.5) {
    return 'Better than average'
  } else if (rating >= 0.5) {
    return 'You could have pushed yourself more!'
  } else {
    return 'Pretty lowsy! Are you even trying?!'
  }
}

export function comp(weekArray: number[], target: number): Result {
  const avg: number = calculateAvg(weekArray)
  const rating = rate(avg, target)
  return {
    periodLength: weekArray.length,
    trainingDays: calcTrainingDays(weekArray),
    success: calcSuccess(avg, target),
    rating: rating,
    ratingDescription: describeRating(rating),
    target: target,
    average: avg
  }
}
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

