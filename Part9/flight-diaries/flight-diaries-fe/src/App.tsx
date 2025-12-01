import { useState, useEffect } from 'react';
import * as diaryService from './services.ts';
import * as diaryTypes from '../../flight-diaries-be/src/data/types.ts';

function App() {
  const [entries, setEntries] = useState<diaryTypes.DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries()
      .then((diaries: diaryTypes.DiaryEntry[]) => {
        console.log(diaries)
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

  const pStyle = {
    margin: 2,
    padding: 2,
  }

  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry: diaryTypes.DiaryEntry) => {
        return (<div key={entry.id}>
          <h3>{entry.date}</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={pStyle}>Weather: {entry.weather}</p>
            <p style={pStyle}>Visibiliy: {entry.visibility}</p>
            {entry.comment ? <p style={pStyle}><i>{entry.comment}</i></p> : null}
          </div>
        </div>
        )
      })}
    </div >
  )
};

export default App;
