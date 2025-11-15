export function validateArgs(args: any[]) {
  if (args.length !== 2) {
    throw new Error(`You must include exactly 2 args.`)
  }
  args.forEach(a => {
    if (typeof a !== 'number') {
      throw new Error(`args must be numbers, current type of ${a} is ${typeof a}`)
    }
  })
  const [height, weight] = args
  if (!height.toString().split("").includes('.') || height.length < 3) {
    throw new Error('height must be in the following format \'n.n+\'')
  }
  if (weight.toString().length !== 3) {
    throw new Error(`weight must be at least 3 digits long, current: ${weight} is ${weight.toString().length} digits long.`)
  }
}

export function getAndSeparateHeightandWeight(args: string[]): number[] {
  const heigthAndWeightString = process.argv.slice(2, 4)
  const heightAndWeightNumber = heigthAndWeightString.map(i => Number(i))
  validateArgs(heightAndWeightNumber)
  return heightAndWeightNumber
}


