import { useState, useEffect } from 'react';
import * as diaryService from './services.ts';
import * as diaryTypes from '../../flight-diaries-be/src/data/types.ts';
import Entries from './Entries.tsx';
import NewEntryForm from './NewEntryForm.tsx';

function App() {
  const [entries, setEntries] = useState<diaryTypes.DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries()
      .then((diaries: diaryTypes.DiaryEntry[]) => {
        setEntries(diaries)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.log(`Error: ${error.message}`)
        }
      });
  }, []);

  if (!entries || entries.length === 0) {
    return <div>No diary entries...</div>
  }

  /** export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
};**/

  return (
    <div>
      <NewEntryForm />
      <Entries entries={entries} />
    </div >
  )
};

export default App;
