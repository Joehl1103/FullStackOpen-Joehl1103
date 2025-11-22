import express from 'express';
import { Response } from 'express';
import { NonSensitiveDiaryEntry } from '../data/types';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>
) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  console.log('here')
  const diary = diaryService.findbyId(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  };
});

router.post('/', (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body;
    const addedEntry = diaryService.addDiary({ date, weather, visibility, comment });
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  };
});

export default router;
