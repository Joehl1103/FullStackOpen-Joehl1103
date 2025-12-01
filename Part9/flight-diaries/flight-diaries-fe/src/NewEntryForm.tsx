import { useState } from 'react';
import * as diaryTypes from '../../flight-diaries-be/src/data/types';
import * as service from './services.ts';


function NewEntryForm() {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string | diaryTypes.Weather>('');
  const [visibility, setVisibility] = useState<string | diaryTypes.Visibility>('');
  const [comment, setComment] = useState<string>('')

  const weatherArray: diaryTypes.Weather[] = Object.values(diaryTypes.Weather);
  const visibilityArray: diaryTypes.Visibility[] = Object.values(diaryTypes.Visibility);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const newEntry: diaryTypes.NewDiaryEntry = {
      date: date,
      weather: weather as diaryTypes.Weather,
      visibility: visibility as diaryTypes.Visibility,
      comment: comment
    }
    service.postDiaries(newEntry)
      .then((res: diaryTypes.NewDiaryEntry): void => {
        window.alert(`You just added a new entry!`);
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.log(`Error: ${err.message}`);
        }
        console.log('Something went wrong')
      })
  };

  return (
    <div>
      <h2>Add Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date: </label>
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="date" />
        </div>
        <div>
          <label>Weather: </label>
          <select
            value={weather}
            onChange={({ target }) => setWeather(target.value)}>
            <option></option>
            {weatherArray.map(w => {
              return (
                <option key={w}>{w}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label>Visibility: </label>
          <select
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}>
            <option></option>
            {visibilityArray.map(v => {
              return (
                <option key={v}>{v}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label>Comments:</label><br />
          <textarea
            value={comment}
            onChange={({ target }) => setComment(target.value)}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form >
    </div >
  )
};

export default NewEntryForm;
