import { validateArgs } from "./helpers.ts";
describe('validateArgs', () => {

  test('validateArgs throws correct errors', () => {
    const arr: Array<[any[], Error]> = [
      [[190], new Error('You must include exactly 2 args.')],
      [['a', 1], new Error('args must be numbers, current type of a is string')],
      [[12, 190], new Error('height must be in the following format \'n.n+\'')],
      [[5.9, 12], new Error('weight must be at 3 digits long, current: 12 is 2 digits long.')]
    ]

    function val(arr: Array<[any[], string]>): void {
      validateArgs(arr)
    }

    arr.forEach(([argsArray, err]) => {
      expect(() => validateArgs(argsArray)).toThrow(err)
    })
  })
})


