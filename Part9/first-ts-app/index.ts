import express from 'express';
import { errorHandler } from './errorMiddleware';
import { calculator } from './calculator';
import type { Request, Response, NextFunction } from 'express';
import type { Operation } from './calculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send('pong');
  } catch (e) {
    next(e);
  }
});


function isOperation(value: unknown): value is Operation {
  return value === 'multiply' || value === 'add' || value === 'divide';
};

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
};

app.post('/calculate', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  if (!value1 || !value2 || !op) {
    return res.status(400).send({ error: 'Some input is undefined.' });
  }
  if (!isNumber(value1) || !isNumber(value2)) {
    return res.status(400).send({ error: 'value1 or value2 are not numbers.' });
  }
  if (!isOperation(op)) {
    return res.status(400).send({ error: 'op is none of multiply, add, or divide' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  return res.send({ result });
});

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


