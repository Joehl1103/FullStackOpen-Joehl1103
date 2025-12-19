import { Request, Response, NextFunction } from "express";
import { patientDataSchema } from "./patientValidation";
import {
  healthCheckEntrySchema,
  occupationalEntrySchema,
  hospitalEntrySchema
} from "./entryValidation";
import { EntryType, EntryWithoutId } from "../data/types";
import * as z from 'zod';
import { exhaustiveTypeGuard } from "./utilityFunctions";

export function parseNewPatientData(req: Request, _res: Response, next: NextFunction) {
  try {
    patientDataSchema.parse(req.body);
    return next();
  } catch (e: unknown) {
    next(e)
  }
  next(new Error('Something went wrong'));
};

export function parseNewEntryData(req: Request, _res: Response, next: NextFunction) {
  try {
    if (!req.body.type) {
      console.log('no body')
      throw new Error('Type is missing.')
    }
    console.log('here')
    const entry: EntryWithoutId = req.body;
    console.log('entry.type', entry.type)
    console.log('EntryType.HEALTHCHECK', EntryType.HEALTHCHECK)
    switch (entry.type) {
      case EntryType.HEALTHCHECK:
        console.log('healthcheck')
        healthCheckEntrySchema.parse(entry);
        break;
      case EntryType.HOSPITAL:
        hospitalEntrySchema.parse(entry);
        break;
      case EntryType.OCCUPATIONAL:
        occupationalEntrySchema.parse(entry);
        break;
      default:
        console.log('default')
        exhaustiveTypeGuard(entry);
    }
    next();
  } catch (e: unknown) {
    next(e)
  }
};

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof z.ZodError) {
    return res.status(400).send({ error: err.issues });
  } else if (err instanceof Error) {
    return res.status(400).send({ error: err.message });
  } else {
    return res.status(400).send('Something went wrong.');
  }
};
