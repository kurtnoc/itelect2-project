import express from 'express';
import db from '../models/index.cjs';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const { Task, User } = db;
const router = express.Router();

// GET /api/tasks -- public, every task with its owning user
router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
  res.json(tasks);
});

// GET /api/tasks/:id -- public
router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  res.json(task);
});

// POST /api/tasks -- any logged-in user
router.post('/tasks', verifyToken, async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// PUT /api/tasks/:id -- any logged-in user
router.put('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.update(req.body);
  res.json(task);
});

// DELETE /api/tasks/:id -- admin only
router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.destroy();
  res.status(200).json({ message: 'Task deleted', task, deletedBy: req.user.email });
});

// GET /api/users -- public
router.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Task, order: [['id', 'ASC']] });
  res.json(users);
});

export default router;