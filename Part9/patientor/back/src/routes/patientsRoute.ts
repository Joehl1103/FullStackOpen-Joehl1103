import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send(patientsService.getPatientsWithoutSsns());
})

export default router;
