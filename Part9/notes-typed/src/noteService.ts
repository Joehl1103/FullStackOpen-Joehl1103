import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NewNote } from './types.ts';
import { NoteParser } from './types.ts';

const BASE_URL = 'http://localhost:3000/notes';

async function getNotes(): Promise<Note[]> {
  return axios
    .get<Note[]>(BASE_URL)
    .then((response: AxiosResponse<Note[]>): Note[] => {
      response.data.forEach((n: Note) => NoteParser.parse(n));
      return response.data
    })
};
async function createNote(object: NewNote): Promise<Note> {
  return axios
    .post<Note>(BASE_URL, object)
    .then((response: AxiosResponse<Note>) => {
      NoteParser.parse(response.data)
      const newNote: Note = response.data
      return newNote
    })
};

export default {
  getNotes,
  createNote
}
