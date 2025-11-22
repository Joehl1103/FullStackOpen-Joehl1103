import * as z from 'zod';
import { NewEntrySchema } from '../utils/utils';
export enum Weather {
  Rainy = 'rainy',
  Sunny = 'sunny',
  Windy = 'windy',
  Cloudy = 'cloudy'
}

export enum Visibility {
  Poor = 'poor',
  Good = 'good',
  Ok = 'ok',
  Great = 'great'
};

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;
