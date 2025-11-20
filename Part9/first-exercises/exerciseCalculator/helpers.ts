export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const TARGET_INDEX = 2;
const WEEK_START_INDEX = 3;
const WEEK_END_INDEX = 10;
const REQUIRED_ARGS = 10;

export function validateNumber(num: number) {
  console.log('over here')
  if (isNaN(num)) {
    console.log('over there')
    throw new Error(`'${num}' is not a number.`);
  }
  console.log('oh')
  if (num < 0) {
    throw new Error('all numbers in array must be positive.');
  }
  console.log('my')
  return
}

export function validateAndReturnNumberArray(array: string[]): number[] {
  const arrayOfNumbers: number[] = array.map(i => {
    const num = Number(i);
    validateNumber(num)
    return num;
  });
  return arrayOfNumbers;
};

export function getAndReturnArgs(args: string[]): [number, number[]] {
  if (args.length < REQUIRED_ARGS) {
    throw new Error(`Please include 1 target value, 7 daily workout hour records. You only provided ${args.length - 2}.`);
  }
  const targetArray: number[] = validateAndReturnNumberArray([args[TARGET_INDEX]]);
  const target: number = targetArray[0];
  const week: number[] = validateAndReturnNumberArray(args.slice(WEEK_START_INDEX, WEEK_END_INDEX));
  return [target, week];
};

export function calcTrainingDays(weekArray: number[]): number {
  return weekArray.filter(i => i > 0).length;
};

export function calculateAvg(weekArray: number[]): number {
  const sum: number = weekArray.reduce((acc, current) => acc += current, 0);
  return sum / weekArray.length;
};

export function calcSuccess(average: number, target: number,): boolean {
  return average >= target;
};

export function rate(average: number, target: number): number {
  const num: number = (average * 3) / target;
  return Number(num.toPrecision(2));
};

export function describeRating(rating: number): string {
  if (rating >= 3) {
    return 'Great! Met or exceeded expectations!';
  } else if (rating >= 1.5) {
    return 'Better than average';
  } else if (rating >= 0.5) {
    return 'You could have pushed yourself more!';
  } else {
    return 'Pretty lousy! Are you even trying?!';
  };
};

export function comp(weekArray: number[], target: number): Result {
  const avg: number = calculateAvg(weekArray);
  const rating: number = rate(avg, target);
  return {
    periodLength: weekArray.length,
    trainingDays: calcTrainingDays(weekArray),
    success: calcSuccess(avg, target),
    rating: rating,
    ratingDescription: describeRating(rating),
    target: target,
    average: avg
  };
};
