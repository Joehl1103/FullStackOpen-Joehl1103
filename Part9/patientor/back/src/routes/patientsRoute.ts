import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { Patient } from '../data/types';

const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatientsWithoutSsns());
})

router.post('/', (req, res): void => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient: Patient = patientsService.addPatient({ name, dateOfBirth, ssn, gender, occupation })
  res.send(newPatient)
})

export default router;
