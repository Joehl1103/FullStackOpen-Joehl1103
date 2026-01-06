import * as z from "zod";
import { Weather, Visibility } from "../data/types";
import { NewDiaryEntry } from "../data/types";

export function toNewDiaryEntry(object: unknown): NewDiaryEntry {
  return NewEntrySchema.parse(object)
};

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional()
});

