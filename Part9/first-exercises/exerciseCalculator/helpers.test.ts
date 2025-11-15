import { getAndReturnArgs, calculateAvg, calcTrainingDays, calcSuccess, rate, describeRating, comp } from './helpers.ts'

describe.only('getAndReturnArgs', () => {
  test('testAllErrors', () => {
    const inputs: Array<[any[], Error]> = [
      [['arg 1', 'arg2', '1'], new Error('Please include 7 daily workout hour records. You only provided 1.')],
      [['arg1', 'arg2', '1', '2', '3', '4', '5', '6', 'a'], new Error('a is not a number.')],
      [['arg1', 'arg2', '1', '3', '3', '4', '5', '6', ' -7'], new Error("all numbers in array must be positive.")]
    ]
    function getAndReturn(arr: any[]) {
      getAndReturnArgs(arr)
    }
    inputs.forEach(([arr, err]) => {
      expect(() => getAndReturn(arr)).toThrow(err)
    })
  })
})

describe('calculateAverage', () => {
  test('calculates average time of daily exercise hours', () => {
    expect(calculateAvg([3, 0, 2, 4.5, 0, 3, 1])).toBeCloseTo(1.9, 3)
  })
})
test('calculates training days', () => {
  expect(calcTrainingDays([3, 0, 2, 4.5, 0, 3, 1])).toBe(5)
})

describe('calculatesSuccess', () => {

  test('below target returns false', () => {
    expect(calcSuccess(1.5, 2)).toBe(false)
  })


  test('meets target returns true', () => {
    expect(calcSuccess(2, 2)).toBe(true)
  })

  test('exceeds target returns true', () => {
    expect(calcSuccess(3, 2)).toBe(true)
  })
})

test('rate', () => {
  expect(rate(1.65, 2)).toBe(2.5)
  expect(rate(1.3, 2)).toBe(2)
  expect(rate(0.7897183, 2)).toBe(1.2)
  expect(rate(1.9285714285714286, 2)).toBe(2.9)
})

test.only('describe rating', () => {
  const ratingsAndDescriptions: Array<[number, string]> = [
    [3, 'Great! Met or exceeded expectations!'],
    [3.1, 'Great! Met or exceeded expectations!'],
    [1.75, 'Better than average'],
    [0.75, 'You could have pushed yourself more!'],
    [0.4, 'Pretty lousy! Are you even trying?!']
  ]
  function testRatingAndExpectedDescriptions(ratingAndDescription: Array<[number, string]>): void {
    ratingsAndDescriptions.forEach(([rating, description]) => {
      expect(describeRating(rating)).toBe(description)
    })
  }
  testRatingAndExpectedDescriptions(ratingsAndDescriptions)
})

test('test comp', () => {
  const weeklyArray = [3, 0, 2, 4.5, 0, 3, 1]
  const targetDaily = 2
  const result = {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2.9,
    ratingDescription: 'Better than average',
    target: 2,
    average: 1.9285714285714286
  }
  expect(comp(weeklyArray, targetDaily)).toStrictEqual(result)

})
