import express, { Response, Request } from 'express';
const router = express.Router();

router.post('/:id', (req: Request, res: Response) => {
  console.log('pinging post entry by id');
});

export default router;
