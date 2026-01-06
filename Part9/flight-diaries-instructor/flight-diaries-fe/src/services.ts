import axios from 'axios';
import * as diaryTypes from './../../flight-diaries-be/src/data/types.ts';

const BASE_URL: string = 'http://localhost:3000/api/diaries';

export async function getDiaries(): Promise<diaryTypes.DiaryEntry[]> {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export async function postDiaries(object: diaryTypes.NewDiaryEntry): Promise<diaryTypes.NewDiaryEntry> {
  const res = await axios.post(BASE_URL, object);
  return res.data
};

