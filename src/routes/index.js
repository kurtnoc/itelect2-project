import express from 'express';
import { mockTasks } from '../utils.js';
import { fetchSampleUsers } from '../api.js';

const router = express.Router();


let cachedUsers = [];


export async function initUsers() {
  cachedUsers = await fetchSampleUsers();
  console.log(`Cached ${cachedUsers.length} users at startup.`);
}

router.get('/tasks', (req, res) => {
  res.json(mockTasks);
});


router.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = mockTasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  res.json(task);
});


router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;