import type { Response } from 'express';

export function validateArgumentLength(body: any, _response: Response): void {
  const keyLength: number = Object.keys(body).length
  // validate body
  if (keyLength === 0 || !body) {
    throw new Error('Nothing in the body of the request')
  }
  if (keyLength > 2 || keyLength < 2) {
    throw new Error(`Wrong number of arguments: ${keyLength}`)
  }
}

export function validateArray(array: any[], response: Response, validateNumber: (num: number) => void): void {
  if (Array.isArray(array)) {
    if (array.length > 7 || array.length < 7) {
      throw new Error(`Array is too long or too short. Length: ${array.length}`)
    }
    array.forEach((i: any): Response | void => {
      const iNum = Number(i)
      try {
        validateNumber(iNum)
      } catch (e) {
        throw new Error(`Error with array number validation: ${e.message}`)
      }
    })
  } else {
    throw new Error('The first argument must be an array.')
  }
}
