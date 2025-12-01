import express from "express";
import diaryRouter from './src/routes/diaries.ts';
import { errorMiddleware } from "./src/utils/middleware.ts";
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log('someone pinged here');
  res.send("pong");
});
app.use('/api/diaries', diaryRouter);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

