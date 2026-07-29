import 'dotenv/config';
import express from 'express';
import router, { initUsers } from './routes/index.js';

const app = express();
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

async function start() {
  await initUsers();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();s