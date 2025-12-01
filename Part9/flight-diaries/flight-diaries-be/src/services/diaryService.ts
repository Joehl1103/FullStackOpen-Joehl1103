import diaries from "../data/entries";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../data/types";

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
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d: DiaryEntry) => d.id)) + 1,
    ...entry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findbyId = (id: number): DiaryEntry | undefined => {
  return diaries.find((d: DiaryEntry) => d.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findbyId
}
