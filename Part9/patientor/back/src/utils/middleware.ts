import { Request, Response, NextFunction } from "express";
import { NewPatientEntry } from "../data/types";
import { patientDataSchema } from "./patientValidation";
import * as z from 'zod';

export function parseNewPatientData(req: Request, _res: Response, next: NextFunction): NewPatientEntry | void {
  try {
    patientDataSchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e)
  }
  next(new Error('Something went wrong'));
};

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof z.ZodError) {
    return res.status(400).send({ error: err.issues });
  } else if (err instanceof Error) {
    return res.status(400).send({ error: err.message });
  } else {
    return res.status(400).send('Something went wrong.');
  }
}
