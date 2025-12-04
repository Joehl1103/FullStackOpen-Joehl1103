import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, Patient } from '../data/types';
import { errorMiddleware, parseNewPatientData } from '../utils/middleware';
const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatientsWithoutSsns());
});

/**
 * Solution: https://stackoverflow.com/questions/74312002/how-to-use-express-js-req-params-with-typescript
 */
interface IParam {
  id: string;
}
router.get('/:id', (req: Request, res: Response) => {
  const params: unknown = req.params
  if (!params || Object.keys(params).length === 0) {
    throw new Error('No parameters');
  }
  const { id } = params as unknown as IParam
  if (!id) {
    throw new Error('No id parameter.')
  }
  const patient = patientsService.getPatientById(id)
  res.json(patient)
});
router.use(parseNewPatientData);
router.use(errorMiddleware);

router.post('/', (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NewPatientEntry>): Patient => {
  const newPatient: Patient = patientsService.addPatient(req.body);
  res.json(newPatient)
  return newPatient;
});



export default router;
