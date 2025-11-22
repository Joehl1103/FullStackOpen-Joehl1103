import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { Patient } from '../data/types';
import { validatePatientData } from '../utils/patientValidation';

const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatientsWithoutSsns());
})

router.post('/', (req, res): void => {
  const validatedPatientData = validatePatientData(req.body)
  const newPatient: Patient = patientsService.addPatient(validatedPatientData)
  res.send(newPatient)
})

export default router;
