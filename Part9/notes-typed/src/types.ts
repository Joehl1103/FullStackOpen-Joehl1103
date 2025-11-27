import * as z from 'zod';

export interface Note {
  id: string,
  content: string
}

export type NewNote = Omit<Note, "id">

export const NoteParser = z.object({
  id: z.string(),
  content: z.string()
})
