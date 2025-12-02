import { useState } from 'react';
import * as diaryTypes from '../../flight-diaries-be/src/data/types';
import * as service from './services.ts';
import axios from 'axios';
import type { MessageType } from './types.ts';

function NewEntryForm({ setNotificationElements }: { setNotificationElements(message: string, type: MessageType): void }) {
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
        setNotificationElements('A new entry was added.', 'Regular');
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setNotificationElements(`Axios error: ${err.message}`, 'Error');
        }
        setNotificationElements('Error: something went wrong.', 'Error');
      })
  };

  const radioStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row'
  }

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
          <fieldset style={radioStyle}>
            <legend>Weather: </legend>
            {weatherArray.map((w: diaryTypes.Weather) => {
              return (
                <label key={w}>
                  <input
                    type="radio"
                    name="weather"
                    value={w}
                    checked={weather === w}
                    onChange={(event) => setWeather(event.target.value)}
                  />
                  {w}
                </label>
              )
            })}
          </fieldset>
        </div>
        <div >
          <fieldset style={radioStyle}>
            <legend>Visibility:</legend>
            {visibilityArray.map((v: diaryTypes.Visibility) => {
              return (
                <label key={v}>
                  <input
                    type="radio"
                    name="visibility"
                    value={v}
                    checked={visibility === v}
                    onChange={(event) => setVisibility(event.target.value)}
                  />
                  {v}
                </label>
              )
            })}
          </fieldset>
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
