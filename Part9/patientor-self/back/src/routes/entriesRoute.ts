import express, { Response, Request } from 'express';
const router = express.Router();

router.post('/:id', (_req: Request, res: Response) => {
  console.log('pringing post entry by id.')
  res.status(200).send('pringing post entry by id.')
});

export default router;
