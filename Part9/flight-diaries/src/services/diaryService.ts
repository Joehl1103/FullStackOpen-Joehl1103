import diaries from "../data/entries";

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../data/types";
import { toNewDiaryEntry } from "../utils";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map((entry: DiaryEntry) => {
    const { comment, ...rest } = entry
    return rest
  })
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const parsedEntry: NewDiaryEntry = toNewDiaryEntry(entry)
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...parsedEntry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findbyId = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findbyId
}
