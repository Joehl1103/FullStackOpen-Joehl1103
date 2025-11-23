import * as z from 'zod';
import { Gender } from '../data/types';

export const patientDataSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(/^(\d{3})\-(\d{2})\-(\d{4})$/),
  gender: z.enum(Gender),
  occupation: z.string()
});
