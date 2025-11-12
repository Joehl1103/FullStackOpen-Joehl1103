
console.log('process.argv', process.argv.length);
if (process.argv.length < 5) throw new Error('Not enough arguments.')
if (process.argv.length > 5) throw new Error('Too many arguments.')
console.log(`performing ${process.argv[4]} on ${process.argv[2]} and ${process.argv[3]}...`);


const firstNumberInput: unknown = process.argv[2];
const secondNumberInput: unknown = process.argv[3];
function checkForNumberAndConvertToPrimitive(input: unknown): number {
  if (Number.isNaN(Number(input))) {
    throw new Error(`${input} is not a number.`);
  }
  return Number(input)
}

const firstNumber = checkForNumberAndConvertToPrimitive(firstNumberInput)
const secondNumber = checkForNumberAndConvertToPrimitive(secondNumberInput)
const operationInput: unknown = process.argv[4];
const acceptableOperationStrings = ["multiply", "add", "divide"]
if (!acceptableOperationStrings.includes(operationInput.toString())) {
  throw new Error(`Operation ${operationInput} is not supported`);
}

type Operation = "multiply" | "add" | "divide";
const op = operationInput as Operation

type Result = string | number;
const calculator = (a: number, b: number, op: Operation): Result => {
  console.log()
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add, or divide')
  }
}

try {
  console.log(`Result: ${calculator(firstNumber, secondNumber, op)}`)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage)
}
