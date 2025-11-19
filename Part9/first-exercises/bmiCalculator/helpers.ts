// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateArgs(args: any[]) {
  if (!args || args.length === 0) {
    throw new Error('Args are empty or undefined.');
  }
  if (args.length !== 2) {
    throw new Error(`You must include exactly 2 args.`);
  };
  args.forEach(a => {
    if (typeof a !== 'number') {
      throw new Error(`args must be numbers, current type of ${a} is ${typeof a}`);
    };
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [height, weight] = args;
  if (typeof height === 'string' && typeof weight === 'string') {
    if (!height.toString().split("").includes('.') || height.length < 3) {
      throw new Error('height must be in the following format \'n.n+\'');
    };
    if (weight.toString().length !== 3) {
      throw new Error(`weight must be at least 3 digits long, current: ${weight} is ${weight.toString().length} digits long.`);
    };
  } else {
    throw new Error('Types of height and / or string are not strings.');
  };
};

export function getAndSeparateHeightandWeight(): number[] {
  const heigthAndWeightString = process.argv.slice(2, 4);
  const heightAndWeightNumber = heigthAndWeightString.map(i => Number(i));
  validateArgs(heightAndWeightNumber);
  return heightAndWeightNumber;
}

