export type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy'

export type Visibility = 'poor' | 'good' | 'ok' | 'great'

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>


