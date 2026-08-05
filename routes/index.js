import express from 'express';
import { mockTasks, validateTask, mergeTaskUpdate } from '../src/utils.js';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

// GT6 - next available id for new tasks (mockTasks already has ids 1-3)
let nextId = mockTasks.length + 1;

// Cached in memory so we only fetch once, at server startup -
// NOT re-fetched on every request to /api/users.
let cachedUsers = [];

// Called once from server.js before app.listen()
export async function initUsers() {
  cachedUsers = await fetchSampleUsers();
  console.log(`Cached ${cachedUsers.length} users at startup.`);
}

// GET /api/tasks - return the full mock task array
router.get('/tasks', (req, res) => {
  res.json(mockTasks);
});

// GET /api/tasks/:id - return one task, or 404 if no match
router.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = mockTasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  res.json(task);
});

// GT6 - POST /api/tasks: create a new task
router.post('/tasks', (req, res) => {
  if (!validateTask(req.body)) {
    return res.status(400).json({ error: 'title and dueDate are required' });
  }

  const task = { id: nextId++, completed: false, ...req.body };
  mockTasks.push(task);
  res.status(201).json(task);
});

// GT6 - PUT /api/tasks/:id: update an existing task
router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  mockTasks[index] = mergeTaskUpdate(mockTasks[index], req.body);
  res.status(200).json(mockTasks[index]);
});

// GT6 - DELETE /api/tasks/:id: remove a task
router.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  const [removed] = mockTasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted', task: removed });
});

// GET /api/users - return the cached, transformed user list from GT4
router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;