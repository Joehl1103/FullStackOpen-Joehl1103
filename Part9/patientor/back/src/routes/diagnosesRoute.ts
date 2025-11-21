const express = require('express');
import { Request, Response } from 'express';
import { Diagnosis } from '../data/types';
import diagnosesService from '../services/diagnosesService'
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.get('/', (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
