import { calculateAvg, calcTrainingDays, calcSuccess, rate, describeRating, comp } from './exerciseCalculatorHelpers.ts'

describe.only('calculateAverage', () => {
  test('calculates average time of daily exercise hours', () => {
    expect(calculateAvg([3, 0, 2, 4.5, 0, 3, 1])).toBe(1.9285714285714286)
  })
  test('testAllError', () => {
    const inputs: any[] = [
      [],
      [1, 2, 3, 4, 5, 6, 'a'],
      [1, 3, 3, 4, 5, 6, -7]
    ]
    const errorMessages = [
      new Error("Your array should include 7 items. It currently only includes 0"),
      new Error("each item in this array must be a number."),
      new Error("all numbers in array must be positive.")
    ]
    function testAvgCalcErrors(arrInputs: Array<any[]>, errorMessages: Array<Error>): void {
      for (let i = 0; i < arrInputs.length; i++) {
        function calc() {
          calculateAvg(arrInputs[i])
        }
        expect(() => calc()).toThrow(errorMessages[i])
      }
    }
    testAvgCalcErrors(inputs, errorMessages)
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

describe('describe rating', () => {
  test('3 or more, Great!', () => {
    expect(describeRating(3)).toBe('Great! Met or exceeded expectations!')
    expect(describeRating(3.1)).toBe('Great! Met or exceeded expectations!')
  })
  test('1.5 or more, better than avg', () => {
    expect(describeRating(1.75)).toBe('Better than average')
  })
  test('0.5 or more, push', () => {
    expect(describeRating(0.75)).toBe('You could have pushed yourself more!')
  })
  test('less than 0.5, lowsy', () => {
    expect(describeRating(0.4)).toBe('Pretty lowsy! Are you even trying?!')
  })
})

test('test comp', () => {
  const arr = [3, 0, 2, 4.5, 0, 3, 1]
  const targ = 2
  const res = {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2.9,
    ratingDescription: 'Better than average',
    target: 2,
    average: 1.9285714285714286
  }
  expect(comp(arr, targ)).toStrictEqual(res)

})
