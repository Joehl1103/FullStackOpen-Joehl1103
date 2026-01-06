import express from 'express';
import { Request, Response } from 'express';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../data/types';
import diaryService from '../services/diaryService';
import { NewEntrySchema } from '../utils/utils';
import * as z from 'zod';
import { newDiaryParser } from '../utils/middleware';

const router = express.Router();


router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>
) => {
  res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findbyId(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  };
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<NewDiaryEntry | { error: unknown }>) => {
  try {
    const parsedEntry: NewDiaryEntry = NewEntrySchema.parse(req.body);
    const addedEntry = diaryService.addDiary(parsedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error.' });
    }
  };
});

export default router;
