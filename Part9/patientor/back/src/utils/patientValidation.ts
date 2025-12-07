import * as z from 'zod';
import { Gender, EntryType } from '../data/types';

export const entrySchema = z.object({
  type: z.enum(EntryType),
})

/**
 *  code for validating american ssns: .regex(/^(\d{3})\-(\d{2})\-(\d{4})$/),
 */
export const patientDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema)
});
