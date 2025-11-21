import diaries from "../data/entries";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../data/types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map((entry: DiaryEntry) => {
    const { comment, ...rest } = entry
    return rest
  })
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
}
