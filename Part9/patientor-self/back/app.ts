import express from 'express';
import diagnosesRouter from './src/routes/diagnosesRoute';
import patientsRouter from './src/routes/patientsRoute';
import entriesRouter from './src/routes/entriesRoute';
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/entries', entriesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('pong');
  res.send('pong');
});

export default app;
