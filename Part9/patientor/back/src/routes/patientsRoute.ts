import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, Patient } from '../data/types';
import { errorMiddleware, parseNewPatientData } from '../utils/middleware';
// import { validatePatientData } from '../utils/patientValidation';

const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatientsWithoutSsns());
});

router.use(parseNewPatientData);
router.use(errorMiddleware);

router.post('/', (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NewPatientEntry>): Patient => {
  const newPatient: Patient = patientsService.addPatient(req.body);
  res.json(newPatient)
  return newPatient;
});

export default router;
