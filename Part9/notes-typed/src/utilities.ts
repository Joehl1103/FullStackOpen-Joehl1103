import * as z from "zod";

export function checkForError(error: unknown): void | Error | z.ZodError {
  if (error instanceof z.ZodError) {
    throw new Error(`Error while fetching notes: ${error.message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error while fetching notes: ${error.message}`);
  } else {
    throw new Error('Something went wrong.')
  }
};
