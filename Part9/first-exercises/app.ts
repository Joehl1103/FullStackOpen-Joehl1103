import express from "express";
import { calculateBmi } from "./bmiCalculator/bmiCalculator.ts";
import { comp as calculateExercises } from './exerciseCalculator/helpers.ts'
import { errorHandler } from "./errorHandler.ts";
import { validateNumber, validateAndReturnNumberArray } from './exerciseCalculator/helpers.ts'
import type { Result } from './exerciseCalculator/helpers.ts'
import { validateArgumentLength, validateArray } from "./app.helpers.ts";

export const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res, next) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    next(new Error('height or weight parameter are undefined.'));
    return;
  };
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    next(new Error('height or weight parameter are not numbers.'));
    return;
  };
  const bmiRes = calculateBmi(Number(height), Number(weight));
  res.send({
    height: height,
    weight: weight,
    bmi: bmiRes
  });
});

app.post('/exercises', (req, res) => {
  const body: any = req.body;
  try {
    validateArgumentLength(body, res)
    const { weeklyArray, target } = body
    validateArray(weeklyArray, res, validateNumber)
    validateNumber(target)
    return res.status(200).json(calculateExercises(weeklyArray, target))
  } catch (e) {
    return res.status(400).json({ error: `Error while validating arguments: ${e.message}` })
  }
})

app.use(errorHandler);
