export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export function calcTrainingDays(weekArray: number[]): number {
  return weekArray.filter(i => i > 0).length
}

function validateArray(array: number[]): void {
  if (array.length < 7) {
    throw new Error(`Your array should include 7 items. It currently only includes ${array.length}`);
  }
  array.forEach(i => {
    if (typeof i !== 'number') {
      throw new Error('each item in this array must be a number.')
    }
    if (i < 0) {
      throw new Error('all numbers in array must be positive.')
    }
  })
}

export function calculateAvg(weekArray: number[]): number {
  validateArray(weekArray)
  const sum: number = weekArray.reduce((acc, current) => acc += current, 0)
  return sum / weekArray.length
}

export function calcSuccess(average: number, target: number,): boolean {
  return average >= target
}

export function rate(average: number, target: number): number {
  const num: number = (average * 3) / target
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
    return 'Pretty lousy! Are you even trying?!'
  }
}

export function comp(weekArray: number[], target: number): Result {
  const avg: number = calculateAvg(weekArray)
  const rating: number = rate(avg, target)
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
