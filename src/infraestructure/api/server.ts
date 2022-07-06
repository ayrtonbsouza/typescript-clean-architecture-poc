import dotenv from 'dotenv';
import { app } from './express';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () =>
  console.log(
    `\x1b[35m 🚀 Server started and listening in:\x1b[36m http://localhost:${port}/`
  )
);
