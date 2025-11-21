import express from 'express';
import diagnosesRouter from './src/routes/diagnosesRoute';
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});

export default app;
