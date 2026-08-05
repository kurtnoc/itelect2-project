import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router, { initUsers } from './routes/index.js';

const app = express();

// GT6 - middleware, all registered ABOVE app.use('/api', router)
app.use(cors());          // lets browsers on other origins call this API
app.use(morgan('dev'));   // logs every incoming request to the terminal
app.use(express.json());  // parses JSON bodies onto req.body

// All routes from routes/index.js now live under /api
app.use('/api', router);

// GT6 - central error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await initUsers();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();