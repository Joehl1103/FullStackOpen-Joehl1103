import { useState, useEffect } from 'react';
import * as diaryService from './services.ts';
import * as diaryTypes from '../../flight-diaries-be/src/data/types.ts';

function App() {

  useEffect(() => {
    diaryService.getDiaries()
      .then((diaries: diaryTypes.DiaryEntry[]) => {
        console.log('diaries', diaries)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.log(`Error: ${error.message}`)
        }
      });
  });

  return (
    <>
    </>
  )
};

export default App;
